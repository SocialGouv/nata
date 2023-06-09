import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../styles/Style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Matomo from 'react-native-matomo-fork';
import {MatomoTrackEvent} from '../../utils/Matomo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorShare = () => {
  const [situation, setSituation] = React.useState<any>();
  const navigation = useNavigation();

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setSituation(JSON.parse(content).situation);
        }
      });
    };
    getContentFromCache();
  }, []);

  return (
    <View style={styles.topContainer}>
      <Pressable
        style={({pressed}) => [
          styles.buttonText,
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={() => {
          navigation.navigate('ShareSituation');
          MatomoTrackEvent('SITUATION', 'SITUATION_SHARE_TO_DOCTOR');
        }}>
        <Image source={require('../../assets/images/Doctor.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{situation?.shareInformationsTitle}</Text>
        </View>
        <Image
          style={{marginRight: 10}}
          source={require('../../assets/images/france.png')}
        />
        <FontAwesome5Icon name="chevron-right" size={20} color={Colors.black} />
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
  buttonText: {
    borderRadius: 100,
    width: '100%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
