import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Fonts} from '../../styles/Style';

const TextBase = ({
  children,
  style,
}: {
  children: string | string[];
  style?: {};
}) => {
  return <Text style={{...styles.text, ...style}}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.primary,
    color: 'black',
  },
});

export default TextBase;
