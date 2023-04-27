import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Meetings} from './interface';
import _ from 'lodash';

interface Props {
  currentMonth: number;
  meetings: Meetings[];
  mandatoryMeetings: Meetings[];
}

const DisplayMeetings = (props: Props) => {
  const {meetings, mandatoryMeetings, currentMonth} = props;

  console.log('MEETINGS', meetings);

  const isFocused = useIsFocused();
  const [userMeetingStatus, setUserMeetingStatus] = React.useState<
    {
      label: string;
      code: string;
      mandatory?: boolean;
      max_month?: number;
    }[]
  >();

  const [fullMeetingList, setFullMeetingList] = React.useState<Meetings[]>([]);

  const {t} = useTranslation();

  const retrieveUserMeetingStatus = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userMeetingStatus');
      if (value !== null) {
        setUserMeetingStatus(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const displayFullMeetings = useCallback(() => {
    console.log('PASSE LA ?');
    let tmpMeetings: Meetings[] = _.uniq([...mandatoryMeetings, ...meetings]);
    tmpMeetings = tmpMeetings.filter(meeting => {
      if (meeting.max_month) {
        return (
          meeting.month <= currentMonth && meeting.max_month >= currentMonth
        );
      }
    });
    if (userMeetingStatus && userMeetingStatus.length > 0) {
      tmpMeetings = tmpMeetings.filter((meeting: Meetings) => {
        return !userMeetingStatus.find(item => {
          return (
            item.code === t(meeting.code) &&
            meeting.month < currentMonth &&
            item.max_month === meeting.max_month
          );
        });
      });
      setFullMeetingList(tmpMeetings);
    } else {
      setFullMeetingList(tmpMeetings);
    }
  }, [userMeetingStatus, currentMonth, mandatoryMeetings, meetings, t]);

  React.useEffect(() => {
    displayFullMeetings();
  }, [displayFullMeetings, isFocused, t]);

  React.useEffect(() => {
    retrieveUserMeetingStatus();
  }, [retrieveUserMeetingStatus, isFocused]);

  const updateUserMeetingStatus = React.useCallback(async () => {
    if (!userMeetingStatus) {
      await AsyncStorage.setItem('userMeetingStatus', JSON.stringify([]));
    } else {
      try {
        await AsyncStorage.setItem(
          'userMeetingStatus',
          JSON.stringify(userMeetingStatus),
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [userMeetingStatus]);

  React.useEffect(() => {
    updateUserMeetingStatus();
  }, [updateUserMeetingStatus]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('followup.meetingTitle')}</Text>
      {fullMeetingList.length === 0 && (
        <Text style={styles.text}>{t('followup.noMeeting')}</Text>
      )}
      {fullMeetingList.map(meeting => {
        return (
          <View style={styles.menuItem} key={meeting.code}>
            {userMeetingStatus && (
              <BouncyCheckbox
                size={25}
                fillColor={Colors.lightPrimary}
                text={t(meeting.label) as string}
                style={styles.chekboxStyle}
                isChecked={
                  userMeetingStatus.find((item: {code: string}) => {
                    return item.code === t(meeting.code);
                  }) !== undefined
                    ? true
                    : false
                }
                textStyle={styles.innerCheckboxText}
                onPress={(isChecked: boolean) => {
                  if (userMeetingStatus) {
                    if (isChecked) {
                      setUserMeetingStatus([
                        ...userMeetingStatus,
                        {
                          label: meeting.label as string,
                          code: t(meeting.code),
                          max_month: meeting.max_month,
                        },
                      ]);
                    } else {
                      setUserMeetingStatus(
                        userMeetingStatus.filter(
                          (item: {label: string}) =>
                            item.label !== (meeting.label as string),
                        ),
                      );
                    }
                  }
                }}
              />
            )}
            {/* <FontAwesome5Icon
              name="chevron-right"
              size={15}
              color={Colors.black}
            /> */}
          </View>
        );
      })}
    </View>
  );
};

export default DisplayMeetings;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 30,
  },
  title: {
    fontFamily: Fonts.primary,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    lineHeight: 24,
    marginBottom: 10,
  },
  text: {
    fontFamily: Fonts.primary,
    fontSize: 16,
    color: Colors.black,
  },
  chekboxStyle: {
    marginVertical: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    paddingRight: 10,
  },
  innerCheckboxText: {
    fontFamily: Fonts.primary,
    fontSize: 16,
    color: Colors.black,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
