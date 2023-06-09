import {
  Image,
  ImageBackground,
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

  useEffect(() => {
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

  const handleLanguageValidation = async () => {
    if (selectedLanguage) {
      await AsyncStorage.setItem('language', selectedLanguage).then(() => {
        navigation.navigate('Onboarding');
        MatomoTrackEvent('ONBOARDING', 'ONBOARDING_CLICK_START');
      });
    }
  };

  return (
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
  );
};

export default LanguageSelection;
