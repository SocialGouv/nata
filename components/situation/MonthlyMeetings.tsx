import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import TextBase from '../ui/TextBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

interface MonthMeeting {
  label: string;
  code: string;
}
const MonthlyMeetings = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const [monthMeetings, setMonthMeetings] = React.useState<MonthMeeting[]>([]);

  const retrieveMonthMeetings = React.useCallback(async () => {
    const values = await AsyncStorage.getItem('userMeetingStatus');
    console.log('values month meeting', values);
    if (values) {
      setMonthMeetings(JSON.parse(values));
    } else {
      setMonthMeetings([]);
    }
  }, []);

  React.useEffect(() => {
    retrieveMonthMeetings();
  }, [retrieveMonthMeetings, isFocused]);

  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>
        {t('situation.monthlyMeetings.title')}
      </TextBase>
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
