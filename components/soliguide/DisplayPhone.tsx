import {
  Linking,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import TextBase from '../ui/TextBase';
import {Colors} from '../../styles/Style';
import {MatomoTrackEvent} from '../../utils/Matomo';

interface Props {
  number: string;
  color: keyof typeof Colors;
  matomo: string;
}

const DisplayPhone = (props: Props) => {
  const {number, color, matomo} = props;
  const handlePhonePress = () => {
    Platform.OS === 'ios'
      ? Linking.openURL(`tel:${number}`)
      : Linking.openURL(`tel:${number}`);
    MatomoTrackEvent(matomo, `${matomo}_CALL`);
  };

  return (
    <TouchableOpacity
      style={styles(color).button}
      onPress={() => handlePhonePress()}>
      <TextBase style={styles(color).whiteText}>📱 {number}</TextBase>
    </TouchableOpacity>
  );
};

export default DisplayPhone;

const styles = (color: keyof typeof Colors) =>
  StyleSheet.create({
    button: {
      backgroundColor: Colors[color],
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      padding: 5,
      marginTop: 10,
    },
    whiteText: {
      color: Colors.white,
      fontWeight: '600',
      fontSize: 14,
    },
  });
