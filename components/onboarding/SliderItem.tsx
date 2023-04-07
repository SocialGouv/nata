import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts} from '../../styles/Style';

interface SliderItemProps {
  item: {
    label: string;
    value: string;
    redirectScreen?: boolean | undefined;
  };
}

const SliderItem = ({item}: SliderItemProps) => {
  const {t} = useTranslation();
  return (
    <View style={styles.boxContainer}>
      <Image source={require('../../assets/images/baby.png')} />
      <Text style={styles.text}>{t(item.label)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    height: 250,
    backgroundColor: Colors.cardBackground,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    paddingTop: 10,
    fontWeight: 'bold',
    fontFamily: Fonts.primary,
  },
});

export default SliderItem;
