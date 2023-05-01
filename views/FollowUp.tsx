import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import Container from '../components/ui/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import contents from '../assets/models/followup.json';
import {useTranslation} from 'react-i18next';
import DisplayMeetings from '../components/followup/DisplayMeetings';
import {Colors, Fonts} from '../styles/Style';
import DisplaySymptomes from '../components/followup/DisplaySymptomes';
import InformationModal from '../components/followup/InformationModal';
import {Meetings, Symptome} from '../components/followup/interface';
import Images from '../assets/models/feotus';
import TextBase from '../components/ui/TextBase';
import {useIsFocused} from '@react-navigation/native';
import DisplayHelpAround from '../components/followup/DisplayHelpAround';
import DisplayLegal from '../components/followup/DisplayLegal';

const FollowUp = () => {
  const {width, height} = useWindowDimensions();
  const isFocused = useIsFocused();
  const styles = StyleSheet.create({
    imageContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'relative',
    },
    backgroundImage: {
      width: width,
      height: height * 0.14,
      resizeMode: 'cover',
    },
    image: {
      top: '-25%',
      zIndex: 100,
    },
    topContainer: {
      alignItems: 'center',
      height: '70%',
      width: width,
      flexDirection: 'row',
      marginHorizontal: 'auto',
      justifyContent: 'center',
      // justifyContent: 'space-between',
    },
    infoContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'relative',
      margin: 0,
      fontWeight: '700',
    },
    text: {
      fontFamily: Fonts.primary,
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '700',
      color: Colors.black,
      paddingHorizontal: 20,
    },
    pressable: {
      fontWeight: '700',
      width: 70,
      marginHorizontal: 10,
    },
  });

  const {t} = useTranslation();

  const [currentMonth, setCurrentMonth] = React.useState<number>();
  const [currentContent, setCurrentContent] = React.useState<{
    title: string;
    text: string;
    list: Meetings[];
    symptoms: Symptome[];
  }>({
    title: '',
    text: '',
    list: [],
    symptoms: [],
  });
  const [mandatoryMeetings, setMandatoryMeeting] = React.useState<Meetings[]>(
    [],
  );
  const [userSymptomesStatus, setUserSymptomesStatus] =
    React.useState<Symptome[]>();

  const [userInfos, setUserInfos] = React.useState<Record<string, string>>();

  const retrieveUserInfos = async () => {
    let tempInfos = {};
    const language = await AsyncStorage.getItem('language');
    if (language !== null) {
      tempInfos = {...{language: language}};
    }
    const values = await AsyncStorage.getItem('userInfos');
    if (values !== null) {
      let JSONValues = JSON.parse(values);
      JSONValues.pregnancyMonth = parseInt(JSONValues.pregnancyMonth, 10);
      tempInfos = {...tempInfos, ...JSONValues};
    } else {
      setUserInfos({});
    }
    setUserInfos(tempInfos);
  };

  React.useEffect(() => {
    retrieveUserInfos();
  }, []);

  const retrieveUserMonth = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userInfos');
      if (value !== null) {
        let tmpUserInfos = JSON.parse(value);
        let tmpMonth = parseInt(tmpUserInfos.pregnancyMonth, 10);
        if (tmpMonth === 0) {
          tmpMonth = 1;
        }
        setCurrentMonth(tmpMonth);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    retrieveUserMonth();
  }, [retrieveUserMonth]);

  React.useEffect(() => {
    if (currentMonth) {
      setCurrentContent(contents.data[currentMonth - 1]);
    }
  }, [currentMonth]);

  const handlePress = (value: number) => {
    if (currentMonth) {
      if (currentMonth + value > 0 && currentMonth + value <= 9) {
        setCurrentMonth(currentMonth + value);
      }
    }
  };

  const retrieveManadatoryMeetings = useCallback(async () => {
    const tmpMandatoryMeetings = contents.data.reduce(
      (acc: any, current: any) => {
        if (current.list) {
          const tmpMandatories = current.list.filter(
            (meeting: any) => meeting.mandatory === true,
          );
          return [...acc, ...tmpMandatories];
        }
        return acc;
      },
      [isFocused],
    );
    setMandatoryMeeting(tmpMandatoryMeetings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  React.useEffect(() => {
    retrieveManadatoryMeetings();
  }, [retrieveManadatoryMeetings]);

  // React.useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.clear();
  //   })();
  // }, []);

  return (
    <Container urgency={false}>
      <InformationModal />
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/images/Ellipse.png')}
            style={styles.backgroundImage}>
            <View style={styles.topContainer}>
              {currentMonth && currentMonth > 1 && (
                <Pressable
                  style={({pressed}) => [
                    styles.pressable,
                    {opacity: pressed ? 0.5 : 1},
                  ]}
                  onPress={() => handlePress(-1)}>
                  <FontAwesome5Icon
                    name="chevron-left"
                    color={Colors.black}
                    size={25}
                  />
                </Pressable>
              )}
              {currentMonth && (
                <TextBase>
                  {currentMonth === 1
                    ? t(currentMonth?.toString()) +
                      ' ' +
                      t('followup.firstMonth')
                    : t(currentMonth?.toString()) + ' ' + t('followup.month')}
                </TextBase>
              )}
              {currentMonth && currentMonth < 9 && (
                <Pressable
                  style={({pressed}) => [
                    styles.pressable,
                    {opacity: pressed ? 0.5 : 1, justifySelf: 'flex-end'},
                  ]}
                  onPress={() => handlePress(1)}>
                  <FontAwesome5Icon
                    name="chevron-right"
                    style={{alignSelf: 'flex-end'}}
                    color={Colors.black}
                    size={25}
                  />
                </Pressable>
              )}
            </View>
          </ImageBackground>
        </View>
        <View style={styles.imageContainer}>
          {currentMonth && (
            <Image
              style={styles.image}
              source={Images[currentMonth as keyof typeof Images]}
            />
          )}
        </View>
        <View style={styles.infoContainer}>
          <TextBase style={styles.text}>{t(currentContent?.text)}</TextBase>
        </View>
        <DisplayMeetings
          currentMonth={currentMonth as number}
          meetings={currentContent.list}
          mandatoryMeetings={mandatoryMeetings}
        />
        <DisplaySymptomes
          isUrgency={false}
          displayTitle={true}
          symptomes={currentContent?.symptoms.filter(symptome => {
            return symptome.status === 'minor';
          })}
          userSymptomesStatus={userSymptomesStatus}
          setUserSymptomesStatus={setUserSymptomesStatus}
        />
        <DisplaySymptomes
          isUrgency={true}
          displayTitle={false}
          symptomes={currentContent?.symptoms.filter(symptome => {
            return symptome.status === 'urgency';
          })}
          userSymptomesStatus={userSymptomesStatus}
          setUserSymptomesStatus={setUserSymptomesStatus}
          currentMonth={currentMonth}
        />
        <DisplayHelpAround userInfos={userInfos} />
        <DisplayLegal />
      </ScrollView>
    </Container>
  );
};

export default FollowUp;
