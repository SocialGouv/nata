import React, {ReactElement} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors} from '../../styles/Style';

interface ContainerProps {
  children: ReactElement[] | ReactElement;
}

const Container = ({children}: ContainerProps) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView style={styles.iosContainer}>
      <View style={styles.topBorder} />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  ) : (
    <View style={styles.androidContainer}>{children}</View>
  );
};

const styles = StyleSheet.create({
  iosContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    margin: 0,
  },
  androidContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    margin: 0,
  },
  container: {
    flex: 1,
  },
  topBorder: {
    backgroundColor: Colors.primary,
    height: 5,
  },
});

export default Container;
