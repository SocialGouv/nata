import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TextBase from '../ui/TextBase';
import {Colors} from '../../styles/Style';
import {useNavigation} from '@react-navigation/native';

const DisplayLegal = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Legal')}>
        <TextBase style={styles.link}>Mentions légales</TextBase>
      </TouchableOpacity>
    </View>
  );
};

export default DisplayLegal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 30,
  },
  link: {
    color: Colors.black,
    textDecorationLine: 'underline',
  },
});
