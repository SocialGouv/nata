import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors, Fonts} from '../../styles/Style';

const TextBase = ({
  children,
  style,
  nbLines,
}: {
  children: string | string[] | any;
  style?: {};
  nbLines?: number;
}) => {
  return (
    <Text style={{...styles.text, ...style}} numberOfLines={nbLines}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.primary,
    color: Colors.black,
  },
});

export default TextBase;
