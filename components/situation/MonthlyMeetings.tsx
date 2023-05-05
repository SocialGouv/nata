import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import TextBase from '../ui/TextBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import AppContext from '../../AppContext';
import contents from '../../assets/models/followup.json';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface MonthMeeting {
  label: string;
  code: string;
}
const MonthlyMeetings = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const {currentMonth} = useContext(AppContext);

  const [allMonthMeetings, setAllMonthMeetings] = React.useState<
    MonthMeeting[][]
  >([]);
  const [monthMeetings, setMonthMeetings] = React.useState<MonthMeeting[]>([]);

  const retrieveAllMeetings = React.useCallback(() => {
    setAllMonthMeetings(contents.data.map(item => item.list));
  }, []);

  const retrieveMonthMeetings = React.useCallback(async () => {
    const userMeetingStatus = await AsyncStorage.getItem('userMeetingStatus');
    const userMeetingStatusParsed = JSON.parse(userMeetingStatus as string);
    const currentMonthMeetings = allMonthMeetings[currentMonth - 1];
    // set month meetings filtering without those in userMeetingStatus async storage
    if (userMeetingStatusParsed && currentMonthMeetings) {
      setMonthMeetings(
        currentMonthMeetings.filter(
          item =>
            !userMeetingStatusParsed.find(
              (userMeeting: MonthMeeting) => userMeeting.code === t(item.code),
            ),
        ),
      );
    }
  }, [currentMonth, allMonthMeetings, t]);

  React.useEffect(() => {
    retrieveAllMeetings();
  }, [retrieveAllMeetings, isFocused]);

  React.useEffect(() => {
    retrieveMonthMeetings();
  }, [retrieveMonthMeetings]);

  const displayMonthMeetingsLines = () => {
    const labelCounts: Record<string, number> = monthMeetings.reduce(
      (acc: Record<string, number>, el) => {
        acc[t(el.label)] = (acc[t(el.label)] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(labelCounts).map(([label, count]) => {
      const key = `${label}_${count}`;
      const text = count > 1 ? `${t(label)} : ${count}` : t(label);
      return (
        <View style={styles.line} key={key}>
          <BouncyCheckbox
            disabled
            isChecked={false}
            fillColor={Colors.primary}
            size={25}
          />
          <TextBase style={styles.text}>{text}</TextBase>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>
        {t('situation.monthlyMeetings.title')}
      </TextBase>
      <View style={styles.listContainer}>
        {monthMeetings.length === 0 && (
          <TextBase style={styles.text}>
            {t('situation.monthlyMeetings.noMonthlyMeetings')}
          </TextBase>
        )}
        {displayMonthMeetingsLines()}
      </View>
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
  listContainer: {
    marginVertical: 20,
  },
  boldText: {
    fontWeight: '700',
    color: Colors.primary,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginRight: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.primary,
    fontWeight: '600',
  },
});
