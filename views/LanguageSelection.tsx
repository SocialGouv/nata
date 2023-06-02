import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, Fonts} from '../styles/Style';
import LanguageSelector from '../components/onboarding/LanguageSelector';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import TextBase from '../components/ui/TextBase';
import {MatomoTrackEvent} from '../utils/Matomo';
import {fetchContent} from '../utils/fetchContent';

const LanguageSelection = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>();
  const [onboarding, setOnboarding] = React.useState<any>();

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

  useEffect(() => {
    const locale = RNLocalize.getLocales()[0].languageCode;
    if (locale) {
      setSelectedLanguage(locale);
    }
  }, []);

  useEffect(() => {
    console.log('CHANGEMENT');
    console.log('selectedLanguage', selectedLanguage);
    if (selectedLanguage) {
      fetchContent(selectedLanguage);
      getContent();
    }
  }, [selectedLanguage]);

  const getContent = async () => {
    try {
      const content = await AsyncStorage.getItem('content');
      if (content !== null) {
        setOnboarding(JSON.parse(content).onboarding);
      }
    } catch (e) {
      console.log('error', e);
    }
  };
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

  // useEffect(() => {
  //   i18n.changeLanguage(selectedLanguage);
  // }, [selectedLanguage, i18n]);

  return (
    <View style={styles.container}>
      {console.log('RENDER')}
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
        {/* t('onboarding.languageSelection.title') */}
      </TextBase>
      <View style={{flex: 0.7}}>
        <LanguageSelector
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
          {/* t('onboarding.begin') */}
          {onboarding?.begin}
        </TextBase>
      </Pressable>
    </View>
  );
};

export default LanguageSelection;
