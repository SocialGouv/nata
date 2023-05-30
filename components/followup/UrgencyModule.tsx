import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles/Style';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const UrgencyModule = () => {
  const {t} = useTranslation();

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

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('UrgencyPage', {
      title: null,
      number: '0 801 801 081',
      keywords: ['Hôpital'],
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.backgroundContainer} />
        <View style={styles.textContainer}>
          <Text style={styles.icon}>🚨</Text>
          <Text style={styles.text}>{t('followup.urgencyText')}</Text>
        </View>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{t('followup.urgencyButton')}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default UrgencyModule;
