import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextBase from '../ui/TextBase';
import {Colors} from '../../styles/Style';
import {useTranslation} from 'react-i18next';

interface Props {
  days: any;
  color: keyof typeof Colors;
}

const DisplayOpen = (props: Props) => {
  const {days, color} = props;
  const {t} = useTranslation();

  const today = (): string => {
    return [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ][new Date().getDay()];
  };

  return (
    <View style={styles(color).container}>
      <TextBase style={styles(color).whiteText}>{`${
        days[today()].open ? t('soliguide.open') : t('soliguide.closed')
      }`}</TextBase>
    </View>
  );
};

export default DisplayOpen;

const styles = (color: keyof typeof Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors[color],
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      padding: 5,
      marginEnd: 10,
      marginTop: 10,
    },
    whiteText: {
      color: Colors.white,
      fontWeight: '600',
      fontSize: 14,
    },
  });
