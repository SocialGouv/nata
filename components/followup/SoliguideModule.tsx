import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../styles/Style';

const SoliGuideModule = () => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginHorizontal: 10,
      borderRadius: 3,
      borderColor: Colors.urgence,
      borderWidth: 2,
      position: 'relative',
    },
    text: {
      fontSize: 14,
      fontWeight: '700',
      width: '80%',
      color: Colors.urgence,
    },
  });

  return (
    <>
      <View style={styles.container} />
    </>
  );
};

export default SoliGuideModule;
