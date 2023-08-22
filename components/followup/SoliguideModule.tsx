import {
  Alert,
  FlatList,
  Linking,
  Pressable,
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
import {MatomoTrackEvent} from '../../utils/Matomo';
import {Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

interface Props {
  categories: number[];
  keywords?: string[];
  city: string;
  style: 'default' | 'urgent';
  matomo: string;
}

const SoliGuideModule = (props: Props) => {
  const [soliguide, setSoliguide] = React.useState<any>();
  const {categories, keywords, city, style, matomo} = props;
  const [cityActualized, setCityActualized] = React.useState<string>('');
  const [data, setData] = React.useState<any>([]);
  const navigation = useNavigation();
  const [content, setContent] = React.useState<any>();
  const [alert, setAlert] = React.useState<boolean>(false);

  const fetchLocation = React.useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetch(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setCityActualized(json.features[0].properties.city);
          })
          .catch(error => console.error(error));
      },
      error => {
        if (error.code === 1) {
          setAlert(true);
        }
      },
    );
  }, []);

  React.useEffect(() => {
    if (alert && content) {
      Alert.alert(content?.locationDescription, '', [
        {
          text: content?.locationServiceText,
          onPress: () => {
            Platform.OS === 'ios'
              ? Linking.openURL('app-settings:')
              : Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
          },
        },
      ]);
    }
  }, [alert]);

  React.useEffect(() => {
    if (city === '') {
      fetchLocation();
    } else {
      setCityActualized(city);
    }
  }, [city, fetchLocation]);

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

  const fetchSoliguide = React.useCallback(async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'JWT ' + process.env.REACT_APP_API_SOLIGUIDE_KEY ?? '',
    );
    let raw = JSON.stringify({
      'location.geoType': 'codePostal',
      'location.geoValue': cityActualized,
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
      .catch(error => console.log('error in soliguide module', error));
  }, [categories, cityActualized, keywords]);

  useEffect(() => {
    fetchSoliguide();
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setSoliguide(JSON.parse(content).soliguide);
          setContent(JSON.parse(content).onboarding);
        }
      });
    };
    getContentFromCache();
  }, [fetchSoliguide]);

  const handleOpenMap = (lat: number, lng: number) => {
    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const url = scheme + `${lat},${lng}`;
    url && Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          horizontal={true}
          data={data.places}
          showsVerticalScrollIndicator={false}
          style={styles.gridView}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  navigation.navigate('SoliguidePage', {structure: item});
                }}
                style={styles.item_style}>
                <Text style={styles.text}>{item.name}</Text>
                <View style={styles.labelsContainer}>
                  <DisplayOpen
                    days={item.newhours}
                    color={
                      style === 'default' ? 'lightPrimary' : 'urgenceLight'
                    }
                  />
                  {/*
                <DisplaySimple
                  text={'1.5km'}
                  color={style === 'default' ? 'lightPrimary' : 'urgenceLight'}
                />
                */}
                  <Pressable
                    onPress={() => {
                      MatomoTrackEvent(matomo, `${matomo}_GO`);
                      handleOpenMap(
                        item.position.location.coordinates[1],
                        item.position.location.coordinates[0],
                      );
                    }}>
                    <DisplaySimple
                      text={`⬆️ ${soliguide?.go}`}
                      color={style === 'default' ? 'primary' : 'urgence'}
                    />
                  </Pressable>
                  {item.entity.phones[0] && (
                    <DisplayPhone
                      number={item.entity.phones[0].phoneNumber}
                      color={style === 'default' ? 'primary' : 'urgence'}
                      matomo={matomo}
                    />
                  )}
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      MatomoTrackEvent(matomo, `${matomo}_MORE_INFO`);
                      navigation.navigate('SoliguidePage', {structure: item});
                    }}>
                    <Text style={styles.infosContainer}>
                      {soliguide?.moreInfos}
                    </Text>
                  </Pressable>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {data.places && data.places.length === 0 && (
          <Text style={styles.not_found}>{soliguide?.noResults}</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default SoliGuideModule;
