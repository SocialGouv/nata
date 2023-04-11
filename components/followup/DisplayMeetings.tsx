import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  meetings: {
    label: string;
    code: string;
  }[];
  // userMeetingStatus: {label: string; code: string}[] | undefined;
  // setUserMeetingStatus: (
  //   value: React.SetStateAction<{label: string; code: string}[] | undefined>,
  // ) => void;
}

const DisplayMeetings = (props: Props) => {
  const [userMeetingStatus, setUserMeetingStatus] = React.useState<
    {
      label: string;
      code: string;
    }[]
  >();
  const {meetings} = props;

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

  React.useEffect(() => {
    retrieveUserMeetingStatus();
  }, [retrieveUserMeetingStatus]);

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
      {meetings.map(meeting => {
        return (
          <View style={styles.menuItem} key={meeting.code}>
            {userMeetingStatus && (
              <BouncyCheckbox
                size={20}
                fillColor={Colors.primary}
                text={t(meeting.label) as string}
                style={styles.chekboxStyle}
                isChecked={
                  userMeetingStatus.find((item: {code: string}) => {
                    return t(item.code) === (t(meeting.code) as string);
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
                          label: t(meeting.label) as string,
                          code: t(meeting.code),
                        },
                      ]);
                    } else {
                      setUserMeetingStatus(
                        userMeetingStatus.filter(
                          (item: {label: string}) =>
                            item.label !== (t(meeting.label) as string),
                        ),
                      );
                    }
                  }
                }}
              />
            )}
            <FontAwesome5Icon
              name="chevron-right"
              size={15}
              color={Colors.black}
            />
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
  chekboxStyle: {
    marginVertical: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
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
