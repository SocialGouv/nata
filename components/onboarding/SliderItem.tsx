import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors, Fonts} from '../../styles/Style';
import Images from '../../assets/models/feotus';
import TextBase from '../ui/TextBase';

interface SliderItemProps {
  item: {
    label: string;
    value: string;
    redirectScreen?: boolean | undefined;
  };
  index: number;
}

const SliderItem = ({item, index}: SliderItemProps) => {
  return (
    <View style={styles.boxContainer}>
      <Image source={Images[index as keyof typeof Images]} />
      <TextBase style={styles.text}>{item.label}</TextBase>
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
