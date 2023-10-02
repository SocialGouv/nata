import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Colors, Fonts} from '../../styles/Style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {MeetingInfo, Meetings, Month} from './interface';
import _ from 'lodash';
import {MatomoTrackEvent} from '../../utils/Matomo';
import TextBase from '../ui/TextBase';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomModal from '../ui/CustomModal';
import Images from '../../assets/models/meetingInfosImages';

interface Props {
  currentMonth: number;
  monthContent: Month;
}

const DisplayMeetings = (props: Props) => {
  const [followup, setFollowup] = React.useState<any>();
  const [allMeetings, setAllMeetings] = React.useState<any>([]);
  const {monthContent, currentMonth} = props;

  const isFocused = useIsFocused();
  const [userMeetingStatus, setUserMeetingStatus] = React.useState<Meetings[]>(
    [],
  );
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const [fullMeetingList, setFullMeetingList] = React.useState<Meetings[]>([]);

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
    const mergedMeetings = monthContent.meetings.map((meeting: Meetings) => {
      return {
        ...meeting,
        months: allMeetings.find((m: Meetings) => m.code === meeting.code)
          .months,
        meeting_info: allMeetings.find((m: Meetings) => m.code === meeting.code)
          .meeting_info,
      };
    });
    let tmpMeetings: Meetings[] = _.uniqBy(
      [
        ...allMeetings.filter(
          (meeting: Meetings) =>
            meeting.isMandatory === true &&
            meeting.maxMonth &&
            meeting.maxMonth <= currentMonth &&
            meeting.maxMonth > monthContent.monthNumber,
        ),
        ...mergedMeetings,
      ],
      'code',
    );

    if (userMeetingStatus && userMeetingStatus.length > 0) {
      // actual meetings according to user status
      // tmpMeetings = tmpMeetings.filter((meeting: Meetings) => {
      //   return !userMeetingStatus.find(item => {
      //     return (
      //       item.code === meeting.code &&
      //       meeting.maxMonth &&
      //       meeting.maxMonth <= currentMonth &&
      //       meeting.maxMonth >= monthContent.monthNumber
      //     );
      //   });
      // });

      setFullMeetingList(_.orderBy(tmpMeetings, ['isMandatory'], ['asc']));
    } else {
      setFullMeetingList(_.orderBy(tmpMeetings, ['isMandatory'], ['asc']));
    }
  }, [userMeetingStatus, currentMonth, monthContent, allMeetings]);

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setFollowup(JSON.parse(content).followup);
          setAllMeetings(JSON.parse(content).meeting.results);
        }
      });
    };
    getContentFromCache();
    // AsyncStorage.clear();
  }, []);

  React.useEffect(() => {
    displayFullMeetings();
  }, [displayFullMeetings, isFocused, monthContent]);

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
      <TextBase style={styles.title}>{followup?.meetingTitle}</TextBase>
      <TextBase style={styles.subText}>{followup?.meetingIndication}</TextBase>
      {fullMeetingList.length === 0 && (
        <Text style={styles.text}>{followup?.noMeeting}</Text>
      )}
      {fullMeetingList.map(meeting => {
        const meetingHasMoreInfo = meeting.hasMoreInfo;
        let meetingInfo: MeetingInfo | undefined;
        if (meetingHasMoreInfo) {
          meetingInfo = meeting.meeting_info;
        }

        return (
          <View style={styles.menuItem} key={meeting.code}>
            <BouncyCheckbox
              size={25}
              fillColor={Colors.lightPrimary}
              text={meeting.title}
              style={styles.chekboxStyle}
              isChecked={
                userMeetingStatus &&
                userMeetingStatus.find((item: Meetings) => {
                  return (
                    item.code === meeting.code &&
                    meeting.months &&
                    item.monthNumber &&
                    meeting.months
                      .map((m: Month) => m.monthNumber)
                      .includes(item.monthNumber)
                  );
                }) !== undefined
                  ? true
                  : false
              }
              textStyle={styles.innerCheckboxText}
              onPress={(isChecked: boolean) => {
                if (userMeetingStatus) {
                  if (isChecked) {
                    MatomoTrackEvent(
                      'FOLOWUP',
                      'FOLLOWUP_MEETING_DONE_SELECT',
                      meeting.title ?? '',
                    );
                    setUserMeetingStatus([
                      ...userMeetingStatus,
                      {
                        title: meeting.title,
                        code: meeting.code,
                        maxMonth: meeting.maxMonth,
                        monthNumber: monthContent.monthNumber,
                        isMandatory: meeting.isMandatory,
                      },
                    ]);
                  } else {
                    setUserMeetingStatus(
                      userMeetingStatus.filter(
                        (item: {title: string}) => item.title !== meeting.title,
                      ),
                    );
                  }
                } else {
                  setUserMeetingStatus([meeting]);
                }
              }}
            />
            {meetingHasMoreInfo && (
              <>
                <Pressable
                  onPress={() => {
                    setModalVisible(true);
                  }}
                  style={styles.infoPress}>
                  <Icon
                    style={styles.infoIcon}
                    name="information-circle-outline"
                    size={24}
                  />
                </Pressable>
                <CustomModal
                  visible={modalVisible}
                  backgroundColor={Colors.backgroundPrimary}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={
                        Images[meetingInfo?.img_slug as keyof typeof Images]
                      }
                      style={styles.image}
                    />
                  </View>
                  <TextBase style={styles.modalTitle}>
                    {meetingInfo && meetingInfo.title}
                  </TextBase>
                  <ScrollView
                    style={styles.modalContainerText}
                    persistentScrollbar>
                    <TextBase style={styles.modalText}>
                      {meetingInfo && meetingInfo.description}
                    </TextBase>
                  </ScrollView>
                </CustomModal>
              </>
            )}
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
  subText: {
    fontFamily: Fonts.primary,
    fontSize: 13,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  chekboxStyle: {
    marginVertical: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-start',
    maxWidth: '80%',
  },
  innerCheckboxText: {
    fontFamily: Fonts.primary,
    fontSize: 16,
    color: Colors.black,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {},
  infoPress: {
    padding: 10,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  modalTitle: {
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
  },
  modalContainerText: {
    padding: 15,
    paddingTop: 0,
    backgroundColor: 'white',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    minHeight: 100,
  },
  modalText: {
    paddingVertical: 15,
  },
});
