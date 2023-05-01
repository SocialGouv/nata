import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import TextBase from '../ui/TextBase';

const MonthlyMeetings = () => {
  // const {t} = useTranslation();
  return (
    <View style={styles.container}>
      {/* <TextBase style={styles.title}>
        {t('situation.monthlyMeetings.title')}
      </TextBase> */}
    </View>
  );
};

export default MonthlyMeetings;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.backgroundPrimary,
    paddingVertical: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
});
