import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextBase from '../ui/TextBase';
import {Colors} from '../../styles/Style';

interface Props {
  text: string;
  color: keyof typeof Colors;
}

const DisplaySimple = (props: Props) => {
  const {text, color} = props;

  return (
    <View style={styles(color).container}>
      <TextBase style={styles(color).whiteText}>{text}</TextBase>
    </View>
  );
};

export default DisplaySimple;

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
