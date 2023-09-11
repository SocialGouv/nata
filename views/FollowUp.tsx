import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback, useContext} from 'react';
import Container from '../components/ui/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import DisplayMeetings from '../components/followup/DisplayMeetings';
import {Colors, Fonts} from '../styles/Style';
import DisplaySymptomes from '../components/followup/DisplaySymptomes';
import {Symptome, Month} from '../components/followup/interface';
import Images from '../assets/models/feotus';
import TextBase from '../components/ui/TextBase';
import DisplayHelpAround from '../components/followup/DisplayHelpAround';
import DisplayLegal from '../components/followup/DisplayLegal';
import AppContext from '../AppContext';
import {MatomoTrackEvent} from '../utils/Matomo';
import {useIsFocused} from '@react-navigation/native';

const FollowUp = () => {
  const {width, height} = useWindowDimensions();
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

  const [followup, setFollowup] = React.useState<any>();
  const [months, setMonths] = React.useState<Month[]>([]);
  const isFocused = useIsFocused();

  const {currentMonth, setCurrentMonth, setDisplayInitialModal} =
    useContext(AppContext);
  const [currentContent, setCurrentContent] = React.useState<Month>({
    title: '',
    description: '',
    monthNumber: 0,
    meetings: [],
    symptoms: [],
  });
  const [userSymptomesStatus, setUserSymptomesStatus] =
    React.useState<Symptome[]>();

  const [loading, setLoading] = React.useState<boolean>(true);

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
    setLoading(false);
  };

  const getContentFromCache = () => {
    AsyncStorage.getItem('content').then(content => {
      if (content !== null) {
        setFollowup(JSON.parse(content).followup);
        setMonths(JSON.parse(content).month.results);
      }
    });
  };

  React.useEffect(() => {
    retrieveUserInfos();
    getContentFromCache();
    MatomoTrackEvent('PAGE_VIEW', 'PAGE_VIEW_FOLLOWUP');
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
        // calculating actual current month, if dateEndPregnancy is set : dateEndPregnancy - currentDate : get month number
        if (tmpUserInfos.dateEndPregnancy) {
          const dateEndPregnancy = new Date(tmpUserInfos.dateEndPregnancy);
          const currentDate = new Date();
          const diffTime = Math.abs(
            dateEndPregnancy.getTime() - currentDate.getTime(),
          );
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const diffMonths = Math.floor(diffDays / 30);
          tmpMonth = 9 - diffMonths;
        }
        setCurrentMonth(tmpMonth !== 0 ? tmpMonth : 9);
      }
    } catch (e) {
      console.log(e);
    }
  }, [setCurrentMonth]);

  React.useEffect(() => {
    retrieveUserMonth();
  }, [retrieveUserMonth]);

  React.useEffect(() => {
    setLoading(true);
    retrieveUserInfos();
  }, [isFocused]);

  React.useEffect(() => {
    if (currentMonth && months) {
      setCurrentContent(
        months.find((m: Month) => m.monthNumber === currentMonth) ??
          currentContent,
      );
    }
  }, [currentMonth, months, currentContent]);

  const handlePress = (value: number) => {
    if (userInfos && userInfos.dateEndPregnancy) {
      if (currentMonth) {
        if (
          currentMonth + value >= parseInt(userInfos.pregnancyMonth, 10) &&
          currentMonth + value <= 9
        ) {
          setCurrentMonth(currentMonth + value);
        }
      }
    } else {
      if (currentMonth) {
        if (currentMonth + value > 0 && currentMonth + value <= 9) {
          setCurrentMonth(currentMonth + value);
        }
      }
    }
  };

  // React.useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.clear();
  //   })();
  // }, []);

  const shouldDisplayButton =
    currentMonth &&
    userInfos &&
    currentMonth > parseInt(userInfos.pregnancyMonth, 10);

  return (
    <Container urgency={false}>
      {/* <InformationModal /> */}
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/images/Ellipse.png')}
            style={styles.backgroundImage}>
            <View style={styles.topContainer}>
              {shouldDisplayButton && (
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
                    ? currentMonth?.toString() + ' ' + followup?.firstMonth
                    : currentMonth?.toString() + ' ' + followup?.month}
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
          <TextBase style={styles.text}>
            {currentContent ? currentContent.description : ''}
          </TextBase>
        </View>
        <DisplayMeetings
          currentMonth={currentMonth as number}
          monthContent={currentContent}
        />
        <DisplaySymptomes
          isUrgency={false}
          displayTitle={true}
          currentMonth={currentContent.monthNumber}
          symptomes={
            !currentContent
              ? []
              : currentContent?.symptoms.filter(symptome => {
                  return symptome.status === 'minor';
                })
          }
          userSymptomesStatus={userSymptomesStatus}
          setUserSymptomesStatus={setUserSymptomesStatus}
        />
        <DisplaySymptomes
          isUrgency={true}
          displayTitle={false}
          symptomes={
            !currentContent
              ? []
              : currentContent?.symptoms.filter(symptome => {
                  return symptome.status === 'urgency';
                })
          }
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
