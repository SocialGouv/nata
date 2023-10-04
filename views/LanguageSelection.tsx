import {
  // AppState,
  Image,
  ImageBackground,
  // Linking,
  // Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Colors, Fonts} from '../styles/Style';
import LanguageSelector from '../components/onboarding/LanguageSelector';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import TextBase from '../components/ui/TextBase';
import {MatomoTrackEvent} from '../utils/Matomo';
import {fetchContent} from '../utils/fetchContent';
import AppContext from '../AppContext';
import Geolocation from '@react-native-community/geolocation';
// import CustomModal from '../components/ui/CustomModal';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface Language {
  code: string;
  nom: string;
  actif: boolean;
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

const LanguageSelection = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const [languages, setLanguages] = React.useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>();
  const [onboarding, setOnboarding] = React.useState<any>();
  const {isOnboardingDone} = React.useContext(AppContext);
  // const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  // const [needGeolocation, setNeedGeolocation] = React.useState<boolean>();
  // const [code, setCode] = React.useState<number>();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
    },
    mission: {
      width: '100%',
      textAlign: 'center',
      fontFamily: Fonts.primary,
      fontSize: 18,
      lineHeight: 32,
      fontWeight: '400',
      marginHorizontal: 0,
      paddingHorizontal: 30,
      marginTop: -30,
    },
    backgroundImage: {
      width: width,
      height: height * 0.16,
      resizeMode: 'cover',
    },
    confirmButton: {
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 3,
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
    image: {
      top: '-10%',
      zIndex: 100,
    },

    modalTextContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 15,
    },
    modalText: {
      fontSize: 14,
      fontFamily: Fonts.primary,
      width: '70%',
    },
    modalConfirmButton: {
      backgroundColor: Colors.primary,
      padding: 10,
      marginTop: 30,
      marginBottom: 45,
      borderRadius: 3,
      paddingHorizontal: 40,
    },
    bottomLink: {
      padding: 15,
      paddingBottom: 40,
      alignSelf: 'center',
    },
    textBottomLink: {
      color: Colors.orange,
      fontSize: 14,
      fontFamily: Fonts.primary,
      textDecorationLine: 'underline',
    },
  });

  const fetchLanguages = async () => {
    const reqOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      'https://nata-bo.numericite.eu' + '/api/languages?populate=*',
      reqOptions,
    );
    const data = await response.json();
    let tmpLanguages: Language[] = [];
    if (data.data) {
      data.data.map(el => tmpLanguages.push(el.attributes));
    }
    tmpLanguages = tmpLanguages.filter(el => el.actif);
    setLanguages(tmpLanguages);
  };

  React.useEffect(() => {
    getLocationServiceStatus();
    fetchLanguages();
    getContentFromCache();
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      fetchContent(selectedLanguage).finally(() => getContentFromCache());
    }
  }, [selectedLanguage]);

  const getContentFromCache = () => {
    return AsyncStorage.getItem('content').then(data => {
      if (data !== null) {
        setOnboarding(JSON.parse(data as string).onboarding);
      }
    });
  };

  const detectUserLanguage = useCallback(() => {
    if (isOnboardingDone !== true) {
      const locale = RNLocalize.getLocales()[0].languageCode;
      if (locale) {
        setSelectedLanguage(locale);
      }
    }
  }, [isOnboardingDone]);

  useEffect(() => {
    detectUserLanguage();
  }, [detectUserLanguage]);

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  const getLocationServiceStatus = async () => {
    return Geolocation.requestAuthorization();
    // if (loopTime < 1) {
    //   return Geolocation.requestAuthorization(
    //     () => {
    //       Geolocation.getCurrentPosition(
    //         () => {
    //           setCode(0);
    //           setNeedGeolocation(false);
    //         },
    //         error => {
    //           if (error.code === 1) {
    //             setCode(1);
    //             setNeedGeolocation(true);
    //           } else if (error.code === 2) {
    //             setCode(2);
    //             setNeedGeolocation(true);
    //           }
    //         },
    //       );
    //     },
    //     error => {
    //       if (error.code === 1) {
    //         setCode(1);
    //         getLocationServiceStatus(1);
    //       } else if (error.code === 2) {
    //         setCode(2);
    //         setNeedGeolocation(true);
    //       }
    //     },
    //   );
    // } else {
    //   setNeedGeolocation(true);
    // }
  };

  const handleLanguageValidation = async () => {
    // if (needGeolocation) {
    //   setModalVisible(true);
    //   return;
    // }
    if (selectedLanguage) {
      AsyncStorage.setItem('language', selectedLanguage).then(() => {
        // setModalVisible(false);
        navigation.navigate('Onboarding');
        MatomoTrackEvent('ONBOARDING', 'ONBOARDING_CLICK_START');
      });
    }
  };

  // const handleGeolocationActivation = () => {
  //   if (Platform.OS === 'ios') {
  //     Linking.openURL('app-settings:');
  //   } else {
  //     code !== 1
  //       ? Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS')
  //       : Linking.openSettings();
  //   }
  // };

  // React.useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (nextAppState === 'active' && needGeolocation) {
  //       getLocationServiceStatus(0);
  //     }
  //   });
  //   return () => {
  //     subscription.remove();
  //   };
  // });

  // const LocationModal = (
  //   <CustomModal
  //     visible={modalVisible}
  //     topPart={true}
  //     borderColor={Colors.orange}
  //     onRequestClose={() => setModalVisible(false)}>
  //     <View style={styles.modalTextContainer}>
  //       <FontAwesome5Icon
  //         name="map-marked-alt"
  //         size={40}
  //         color={Colors.orange}
  //       />
  //       <TextBase style={styles.modalText}>
  //         {onboarding?.locationDescription}
  //       </TextBase>
  //       {/* <Pressable
  //         onPress={() => handleLanguageValidation()}
  //         style={({pressed}) => [
  //           {
  //             opacity: pressed ? 0.5 : 1,
  //           },
  //         ]}>
  //         <FontAwesome5Icon name="times" size={20} color="#000" />
  //       </Pressable> */}
  //     </View>
  //     {!needGeolocation ? (
  //       <Pressable
  //         style={[
  //           styles.modalConfirmButton,
  //           {
  //             alignSelf: 'center',
  //             backgroundColor: Colors.orange,
  //           },
  //         ]}
  //         onPress={() => handleLanguageValidation()}>
  //         <TextBase style={styles.confirmButtonText}>
  //           {onboarding?.begin}
  //         </TextBase>
  //       </Pressable>
  //     ) : (
  //       <Pressable
  //         style={styles.bottomLink}
  //         onPress={() => handleGeolocationActivation()}>
  //         <TextBase style={styles.textBottomLink}>
  //           {onboarding?.locationServiceText}{' '}
  //           <FontAwesome5Icon
  //             name="arrow-right"
  //             size={12}
  //             color={Colors.orange}
  //           />
  //         </TextBase>
  //       </Pressable>
  //     )}
  //   </CustomModal>
  // );

  return (
    <>
      {/* {modalVisible && LocationModal} */}
      <View style={styles.container}>
        <View>
          <ImageBackground
            source={require('../assets/images/Ellipse.png')}
            style={styles.backgroundImage}
          />
        </View>
        <Image
          style={styles.image}
          source={require('../assets/images/nata.png')}
        />
        <TextBase style={styles.mission}>
          {onboarding?.languageSelectionTitle}
        </TextBase>
        <View style={{flex: 0.7}}>
          <LanguageSelector
            languages={languages}
            selectedLanguage={selectedLanguage}
            changeLanguage={changeLanguage}
          />
        </View>
        <Pressable
          onPress={handleLanguageValidation}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              ...styles.confirmButton,
            },
          ]}>
          <TextBase style={styles.confirmButtonText}>
            {onboarding?.begin}
          </TextBase>
        </Pressable>
      </View>
    </>
  );
};

export default LanguageSelection;
