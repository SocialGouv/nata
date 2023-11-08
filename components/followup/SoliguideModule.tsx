import {
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import DisplayPhone from '../soliguide/DisplayPhone';
import {Colors, Fonts} from '../../styles/Style';
import DisplayOpen from '../soliguide/DisplayOpen';
import DisplaySimple from '../soliguide/DisplaySimple';
import {MatomoTrackEvent} from '../../utils/Matomo';
import {Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import CustomModal from '../ui/CustomModal';
import AppContext from '../../AppContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextBase from '../ui/TextBase';

interface Props {
  categories: number[];
  keywords?: string[];
  city: string;
  style: 'default' | 'urgent';
  matomo: string;
}

const SoliGuideModule = (props: Props) => {
  const {needGeolocation, setNeedGeolocation} = useContext(AppContext);
  const [soliguide, setSoliguide] = React.useState<any>();
  const {categories, keywords, city, style, matomo} = props;
  const [zipCodeActualized, setZipCodeActualized] = React.useState<string>('');
  const [data, setData] = React.useState<any>([]);
  const navigation = useNavigation();
  const [content, setContent] = React.useState<any>();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [coordinates, setCoordinates] = React.useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  const fetchLocation = React.useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCoordinates({latitude, longitude});
        fetch(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`,
        )
          .then(response => response.json())
          .then(json => {
            setNeedGeolocation(false);
            setZipCodeActualized(json.features[0].properties.postcode);
          })
          .catch(error => console.error(error));
      },
      error => {
        if (error.code === 1) {
          setModalVisible(true);
        }
      },
    );
  }, [setNeedGeolocation]);

  React.useEffect(() => {
    if (city === '') {
      fetchLocation();
    } else {
      setZipCodeActualized(city);
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

    modalTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      paddingBottom: 20,
    },
    modalText: {
      fontSize: 14,
      fontFamily: Fonts.primary,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    modalConfirmButton: {
      backgroundColor: Colors.primary,
      padding: 10,
      paddingHorizontal: 40,
      marginTop: 30,
      marginBottom: 45,
      borderRadius: 3,
    },
    bottomLink: {
      alignSelf: 'center',
      borderTopWidth: 1,
      borderColor: 'lightgrey',
      width: '100%',
    },
    textBottomLink: {
      color: '#007AFF',
      paddingHorizontal: 15,
      paddingVertical: 10,
      textAlign: 'center',
      fontSize: 14,
      fontFamily: Fonts.primary,
    },
    confirmButton: {
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 10,
      paddingHorizontal: 40,
      position: 'absolute',
      bottom: 20,
    },
    confirmButtonText: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: '700',
      fontFamily: Fonts.primary,
    },
  });

  const fetchData = React.useCallback(async () => {
    if (style === 'urgent') {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      fetch(
        `https://nata-bo.numericite.eu/api/get-hospitals?category=urgences maternité &latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&zipcode=${zipCodeActualized}`,
        requestOptions,
      )
        .then(response => response.json())
        .then(result => {
          setData({places: result.hospitals});
        })
        .catch(error => console.log('error', error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append(
        'Authorization',
        'JWT ' + process.env.REACT_APP_API_SOLIGUIDE_KEY ?? '',
      );
      let raw = JSON.stringify({
        'location.geoType': 'codePostal',
        'location.geoValue': zipCodeActualized,
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
        .then(response => response.json())
        .then(result => {
          if (!result.places) {
            return;
          }
          if (keywords && keywords.length > 0) {
            const filtered = result.places.filter((place: any) => {
              return keywords.some((keyword: string) => {
                return (
                  place.name.toLowerCase().includes(keyword.toLowerCase()) ||
                  place.description
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
                );
              });
            });
            setData({places: filtered});
          } else {
            setData(result);
          }
        })
        .catch(error => console.log('error in soliguide module', error));
    }
  }, [categories, zipCodeActualized, keywords, style]);

  useEffect(() => {
    fetchData();
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setSoliguide(JSON.parse(content).soliguide);
          setContent(JSON.parse(content).onboarding);
        }
      });
    };
    getContentFromCache();
  }, [fetchData]);

  const handleOpenMap = (lat: number, lng: number) => {
    const scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:0,0?q=';
    const url = scheme + `${lat},${lng}`;
    url && Linking.openURL(url);
  };

  const handleLocationValidation = async () => {
    setModalVisible(false);
  };
  const handleGeolocationActivation = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
    }
  };
  const LocationModal = (
    <CustomModal
      visible={modalVisible}
      customHeader
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.modalTextContainer}>
        <TextBase style={styles.modalText}>
          {content?.locationDescription}
        </TextBase>
      </View>
      {!needGeolocation ? (
        <Pressable
          style={{
            ...styles.confirmButton,
            ...{
              position: 'relative',
              alignSelf: 'center',
              marginTop: 20,
            },
          }}
          onPress={() => handleLocationValidation()}>
          <TextBase style={styles.confirmButtonText}>{content?.begin}</TextBase>
        </Pressable>
      ) : (
        <>
          <Pressable
            style={styles.bottomLink}
            onPress={() => handleGeolocationActivation()}>
            <TextBase
              style={{...styles.textBottomLink, ...{fontWeight: 'bold'}}}>
              {content?.locationServiceText}{' '}
              <FontAwesome5Icon
                name="arrow-right"
                size={12}
                color={'#007AFF'}
              />
            </TextBase>
          </Pressable>
          <Pressable
            style={styles.bottomLink}
            onPress={() => {
              setModalVisible(false);
            }}>
            <TextBase style={styles.textBottomLink}>{content?.back}</TextBase>
          </Pressable>
        </>
      )}
    </CustomModal>
  );

  return (
    <>
      {Platform.OS === 'android' && modalVisible && LocationModal}
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
                    {item.newshours && (
                      <DisplayOpen
                        days={item.newhours}
                        color={
                          style === 'default' ? 'lightPrimary' : 'urgenceLight'
                        }
                      />
                    )}

                    <Pressable
                      onPress={() => {
                        MatomoTrackEvent(matomo, `${matomo}_GO`);
                        handleOpenMap(
                          item.position.location.coordinates
                            ? item.position.location.coordinates[1]
                            : item.position.location[1],
                          item.position.location.coordinates
                            ? item.position.location.coordinates[0]
                            : item.position.location[0],
                        );
                      }}>
                      <DisplaySimple
                        text={`⬆️ ${soliguide?.go}`}
                        color={style === 'default' ? 'primary' : 'urgence'}
                      />
                    </Pressable>
                    {item?.entity?.phones[0] && (
                      <DisplayPhone
                        number={item?.entity?.phones[0].phoneNumber}
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
                      <TextBase style={styles.infosContainer}>
                        {soliguide?.moreInfos}
                      </TextBase>
                    </Pressable>
                    {item.distance && (
                      <TextBase>
                        {Math.trunc(item.distance * 100) / 100 + ' km'}
                      </TextBase>
                    )}
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
    </>
  );
};

export default SoliGuideModule;
