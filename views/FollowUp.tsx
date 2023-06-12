import {
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
import InformationModal from '../components/followup/InformationModal';
import {Symptome, Month} from '../components/followup/interface';
import Images from '../assets/models/feotus';
import TextBase from '../components/ui/TextBase';
import DisplayHelpAround from '../components/followup/DisplayHelpAround';
import DisplayLegal from '../components/followup/DisplayLegal';
import AppContext from '../AppContext';
import {MatomoTrackEvent} from '../utils/Matomo';

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

  const {currentMonth, setCurrentMonth} = useContext(AppContext);
  const [currentContent, setCurrentContent] = React.useState<Month>({
    title: '',
    description: '',
    monthNumber: 0,
    meetings: [],
    symptoms: [],
  });
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

  const getContentFromCache = () => {
    return AsyncStorage.getItem('content').then(content => {
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
        setCurrentMonth(tmpMonth);
      }
    } catch (e) {
      console.log(e);
    }
  }, [setCurrentMonth]);

  React.useEffect(() => {
    retrieveUserMonth();
  }, [retrieveUserMonth]);

  React.useEffect(() => {
    if (currentMonth && months) {
      setCurrentContent(
        months.find((m: Month) => m.monthNumber === currentMonth) ??
          currentContent,
      );
    }
  }, [currentMonth, months, currentContent]);

  const handlePress = (value: number) => {
    if (currentMonth) {
      if (currentMonth + value > 0 && currentMonth + value <= 9) {
        setCurrentMonth(currentMonth + value);
      }
    }
  };

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
