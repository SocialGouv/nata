import {Image, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../styles/Style';
import LanguageSelector from '../components/onboarding/LanguageSelector';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LanguageSelection = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>();

  useEffect(() => {
    const locale = RNLocalize.getLocales()[0].languageCode;
    if (locale) {
      setSelectedLanguage(locale);
    }
  }, []);

  const changeLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleLanguageValidation = async () => {
    if (selectedLanguage) {
      await AsyncStorage.setItem('language', selectedLanguage).then(() => {
        navigation.navigate('Onboarding');
      });
    }
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/nata.png')} />
      <Text style={styles.mission}>
        {t('onboarding.languageSelection.title')}
      </Text>
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
        <Text style={styles.confirmButtonText}>{t('onboarding.begin')}</Text>
      </Pressable>
    </View>
  );
};

export default LanguageSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 60 : 20,
    marginHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  mission: {
    fontFamily: Fonts.primary,
    fontSize: 18,
    lineHeight: 32,
    fontWeight: '400',
    marginTop: 20,
    marginHorizontal: 0,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 3,
    marginTop: 20,
    paddingHorizontal: 40,
    position: 'absolute',
    bottom: 30,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
});
