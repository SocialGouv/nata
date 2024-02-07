import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles/Style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MatomoTrackEvent} from '../../utils/Matomo';
import {Symptome} from './interface';

interface UrgencyProps {
  symptom?: Symptome;
}

const UrgencyModule = ({symptom}: UrgencyProps) => {
  const styles = StyleSheet.create({
    backgroundContainer: {
      width: '100%',
      opacity: 0.1,
      height: '100%',
      top: 0,
      backgroundColor: Colors.urgence,
      paddingVertical: 20,
      paddingHorizontal: 15,
      position: 'absolute',
    },
    container: {
      width: '100%',
      marginHorizontal: 10,
      borderRadius: 3,
      borderColor: Colors.urgence,
      borderWidth: 2,
      position: 'relative',
    },
    textContainer: {
      paddingVertical: 20,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
    },
    icon: {
      fontSize: 30,
      fontWeight: '700',
    },
    text: {
      fontSize: 14,
      fontWeight: '700',
      width: '80%',
      color: Colors.urgence,
    },
    button: {
      backgroundColor: Colors.urgence,
      paddingVertical: 10,
      alignSelf: 'center',
      paddingHorizontal: 20,
      borderRadius: 3,
      marginBottom: 10,
    },
    buttonText: {
      fontSize: 16,
      color: Colors.white,
      fontWeight: '700',
    },
  });

  const keywords = [
    {language: 'fr', label: 'Hôpital'},
    {language: 'en', label: 'Hôpital'},
    {language: 'ro', label: 'Hôpital'},
    {language: 'ar', label: 'Hôpital'},
    {
      language: 'fa-AF',
      label: 'Hôpital',
    },
    {
      language: 'ps',
      label: 'Hôpital',
    },
  ];

  const [followup, setFollowup] = React.useState<any>();
  const [language, setLanguage] = React.useState<string>();

  const navigation = useNavigation();

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setFollowup({
            ...JSON.parse(content).followup,
            back: JSON.parse(content).onboarding.back,
          });
        }
        AsyncStorage.getItem('language').then(language => {
          if (language !== null) {
            setLanguage(language);
          }
        });
      });
    };

    getContentFromCache();
  }, []);

  const onPress = () => {
    MatomoTrackEvent('URGENCY', 'FIND_URGENCY');
    navigation.navigate('UrgencyPage', {
      title: symptom && symptom.urgencyPageMainTitle,
      subTitle: symptom && symptom.urgencyPageSubTitle,
      phoneNumber: (symptom && symptom.phoneNumber) ?? '15',
      secondPhoneNumber: symptom && symptom.secondPhoneNumber,
      urgencyText: symptom && symptom.urgencyPageText,
      keywords: [
        keywords.find(keyword => keyword.language === language)?.label,
      ],
      back: followup?.back,
      isSymptom: true,
      displayHospital: true,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.backgroundContainer} />
        <View style={styles.textContainer}>
          <Text style={styles.icon}>🚨</Text>
          <Text style={styles.text}>
            {symptom && symptom.urgencyModuleText
              ? symptom.urgencyModuleText
              : followup?.urgencyText.replace(
                  '*',
                  (symptom && symptom.phoneNumber) ?? '15',
                )}
          </Text>
        </View>
        {symptom && symptom.status === 'urgency' && (
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{followup?.urgencyButton}</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default UrgencyModule;
