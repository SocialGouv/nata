import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors, Fonts} from '../../styles/Style';
import TextBase from '../ui/TextBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import AppContext from '../../AppContext';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Meetings, Month} from '../followup/interface';

const MonthlyMeetings = () => {
  const [situation, setSituation] = React.useState<any>();
  const isFocused = useIsFocused();
  const {currentMonth} = useContext(AppContext);

  const [monthMeetings, setMonthMeetings] = React.useState<Meetings[]>([]);

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setSituation(JSON.parse(content).situation);

          AsyncStorage.getItem('userMeetingStatus')
            .then(meetingStatus => JSON.parse(meetingStatus as string))
            .then(meetingParsed => {
              setMonthMeetings(
                JSON.parse(content)
                  .month.results?.find(
                    (month: Month) => month.monthNumber === currentMonth,
                  )
                  ?.meetings.filter(
                    (meeting: Meetings) =>
                      !meetingParsed.find(
                        (userMeeting: Meetings) =>
                          userMeeting.code === meeting.code,
                      ),
                  ),
              );
            });
        }
      });
    };
    getContentFromCache();
  }, [currentMonth, isFocused]);

  const displayMonthMeetingsLines = () => {
    const labelCounts: Record<string, number> = monthMeetings.reduce(
      (acc: Record<string, number>, el) => {
        acc[el.title] = (acc[el.title] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(labelCounts).map(([label, count]) => {
      const key = `${label}_${count}`;
      const text = count > 1 ? `${label} : ${count}` : label;
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
        {situation?.monthlyMeetingsTitle}
      </TextBase>
      <View style={styles.listContainer}>
        {monthMeetings.length === 0 && (
          <TextBase style={styles.text}>
            {situation?.noMonthlyMeetings}
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
