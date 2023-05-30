import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import DisplayPhone from '../soliguide/DisplayPhone';
import {Colors} from '../../styles/Style';
import DisplayOpen from '../soliguide/DisplayOpen';
import DisplaySimple from '../soliguide/DisplaySimple';
import {useTranslation} from 'react-i18next';

interface Props {
  categories: number[];
  keywords?: string[];
  city: string;
  style: 'default' | 'urgent';
}

const SoliGuideModule = (props: Props) => {
  const {categories, keywords, city, style} = props;
  const [data, setData] = React.useState<any>([]);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      position: 'relative',
    },
    item_style: {
      backgroundColor: '#ffffff',
      padding: 15,
      marginEnd: 20,
      width: 290,
      borderRadius: 5,
      borderColor: Colors.border,
      borderWidth: 1,
    },
    labelsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    infosContainer: {
      marginTop: 20,
      fontSize: 14,
      fontWeight: '400',
      textDecorationLine: 'underline',
    },
    logo: {
      aspectRatio: 1.5,
      resizeMode: 'contain',
    },
    gridView: {
      marginBottom: 20,
      flex: 1,
      alignContent: 'center',
      marginHorizontal: 'auto',
    },
    text: {
      fontSize: 15,
      fontWeight: '500',
      flexWrap: 'wrap',
      width: '80%',
      color: '#000000',
      marginBottom: 10,
    },
    not_found: {
      fontSize: 17,
      fontWeight: '400',
      flexWrap: 'wrap',
      width: '80%',
      color: '#000000',
      marginBottom: 10,
    },
  });

  const fetchSoliguide = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'JWT ' + process.env.REACT_APP_API_SOLIGUIDE_KEY ?? '',
    );
    var raw = JSON.stringify({
      'location.geoType': 'ville',
      'location.geoValue': city,
      categories: categories,
      'options.limit': 100,
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(
      'https://api.soliguide.fr/new-search/' +
        (await AsyncStorage.getItem('language')),
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        if (keywords && keywords.length > 0) {
          const filtered = JSON.parse(result).places.filter((place: any) => {
            return keywords.some((keyword: string) => {
              return place.description
                .toLowerCase()
                .includes(keyword.toLowerCase());
            });
          });
          setData({places: filtered});
        } else {
          setData(JSON.parse(result));
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    fetchSoliguide();
  }, [city]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          horizontal={true}
          data={data.places}
          showsVerticalScrollIndicator={false}
          style={styles.gridView}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={async () => {
                navigation.navigate('SoliguidePage', {structure: item});
              }}
              style={styles.item_style}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={styles.labelsContainer}>
                <DisplayOpen
                  days={item.newhours}
                  color={style === 'default' ? 'lightPrimary' : 'urgenceLight'}
                />
                {/*
                <DisplaySimple
                  text={'1.5km'}
                  color={style === 'default' ? 'lightPrimary' : 'urgenceLight'}
                />
                */}
                <DisplaySimple
                  text={`⬆️ ${t('soliguide.go')}`}
                  color={style === 'default' ? 'primary' : 'urgence'}
                />
                {item.entity.phones[0] && (
                  <DisplayPhone
                    number={item.entity.phones[0].phoneNumber}
                    color={style === 'default' ? 'primary' : 'urgence'}
                  />
                )}
              </View>
              <View>
                <Text style={styles.infosContainer}>
                  {t('soliguide.more_infos')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {data.places && data.places.length === 0 && (
          <Text style={styles.not_found}>{t('soliguide.no_results')}</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SoliGuideModule;
