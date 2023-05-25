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

interface Props {
  categories: number[];
  keywords: string[];
  city: string;
  style: 'default' | 'urgent';
}

const SoliGuideModule = (props: Props) => {
  const {categories, keywords, city, style} = props;
  const [data, setData] = React.useState<any>([]);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      position: 'relative',
    },
    item_style: {
      backgroundColor: '#ffffff',
      padding: 20,
      marginEnd: 20,
      width: 270,
      borderRadius: 5,
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
      width: '80%',
      color: '#000000',
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
      'https://api.soliguide.fr/new-search?lang=' +
        (await AsyncStorage.getItem('language')),
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        setData(JSON.parse(result));
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    console.log('city : ', city);
    fetchSoliguide();
  }, [city]);

  useEffect(() => {
    console.log('data : ', data);
  }, [data]);

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
                console.log('go to : ', item.name);
              }}
              style={styles.item_style}>
              <Text style={styles.text}>{item.name}</Text>
              <View></View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default SoliGuideModule;
