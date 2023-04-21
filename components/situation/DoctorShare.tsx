import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../styles/Style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const DoctorShare = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.topContainer}>
      <Image source={require('../../assets/images/Doctor.png')} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {t('situation.shareInformations.title')}
        </Text>
      </View>
      <Pressable
        style={({pressed}) => [
          styles.button,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={() => {
          navigation.navigate('ShareSituation');
        }}>
        <FontAwesome5Icon name="chevron-right" size={20} color={Colors.white} />
      </Pressable>
    </View>
  );
};

export default DoctorShare;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 3,
    paddingVertical: 10,
    display: 'flex',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: Fonts.primary,
  },
  boldText: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    width: 35,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
