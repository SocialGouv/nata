import {CustomCarousel} from './../components/onboarding/CustomCarousel';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import questions from '../assets/models/questions.json';
import Container from '../components/ui/Container';
import {Image, Pressable, View} from 'react-native';
import AnswerButton from '../components/onboarding/AnswerButton';
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../styles/Style';
import {useWindowDimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import Images from '../assets/models/onboardingImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext';
import TextBase from '../components/ui/TextBase';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {set} from 'lodash';

interface PressFunction {
  answer: {
    label: string;
    value: string;
    redirectScreen?: boolean;
    redirectScreenContent?: string | undefined;
    phone?: string;
    image?: string;
    labelSearch?: string;
    boldBottom?: String;
  };
  question: {
    label: string;
    isSpecial?: boolean;
    slug: string;
    answerDanger?: {
      label: string;
      value: string;
      redirectScreen?: boolean;
    };
    verticalAnswer?: boolean;
  };
}

interface UserInfos {
  [key: string]: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [pregnancyMonth, setPrengancyMonth] = React.useState<number>(1);
  const [userInfos, setUserInfos] = React.useState<UserInfos>({});

  const {
    setIsOnboardingDone,
    setDisplayInitialModal,
    setIsEmergencyOnBoardingDone,
  } = useContext(AppContext);

  const {t} = useTranslation();

  const handleUrgencyPath = () => {
    if (userInfos) {
      if (
        parseInt(userInfos.pregnancyMonth, 10) < 6 &&
        userInfos.isMeetingPlanned === 'Q5A2'
      ) {
        if (userInfos.housing === 'Q7A5' || userInfos.housing === 'Q7A3') {
          setIsOnboardingDone(true);
          navigation.navigate('UrgencyPage', {
            title: t('onboarding.urengecyTitleUnder5'),
            number: '0 801 801 081',
          });
        } else {
          console.log('urgence sans telephone');
          setIsOnboardingDone(true);
          navigation.navigate('UrgencyPage', {
            title: t('onboarding.urengecyTitleUnder5'),
          });
        }
      } else if (
        parseInt(userInfos.pregnancyMonth, 10) >= 6 &&
        userInfos.isMeetingPlanned === 'Q5A2'
      ) {
        if (
          (userInfos.medical_care === 'Q6A1' ||
            userInfos.medical_care === 'Q6A2') &&
          userInfos.housing === 'Q7A4'
        ) {
          setIsOnboardingDone(true);
          navigation.navigate('UrgencyPage', {});
        } else {
          setIsOnboardingDone(true);
          navigation.navigate('UrgencyPage', {
            number: '0 801 801 081',
          });
        }
      } else {
        console.log('pas urgence');
        setIsOnboardingDone(true);
        setIsEmergencyOnBoardingDone(true);
        setDisplayInitialModal(true);
        navigation.navigate('FollowUp');
      }
    }
  };

  const handlePress = async ({answer, question}: PressFunction) => {
    if (
      question.slug === 'isPregnant' &&
      answer.value === 'Q1A2' &&
      answer.redirectScreen
    ) {
      navigation.navigate('ShortOnboardingEnd', {
        content: answer.redirectScreenContent,
        image: answer.image,
      });
    } else if (
      answer.redirectScreen &&
      answer.value !== 'Q4A2' &&
      !question.isSpecial
    ) {
      navigation.navigate('OnboardingEndPath', {
        content: answer.redirectScreenContent,
        number: answer.phone,
        image: answer.image,
      });
    } else if (
      parseInt(userInfos.pregnancyMonth, 10) === 0 &&
      answer.value === 'Q4A2' &&
      answer.redirectScreen
    ) {
      navigation.navigate('OnboardingEndPath', {
        content: answer.redirectScreenContent,
        number: answer.phone,
        image: answer.image,
        labelSearch: answer.labelSearch,
        boldBottom: answer.boldBottom,
      });
    } else {
      if (currentStep < questions.data.length) {
        setUserInfos(
          Object.assign(userInfos, {
            [question.slug]: question.isSpecial
              ? pregnancyMonth.toString()
              : answer.value,
          }),
        );
        setCurrentStep(currentStep + 1);
      } else if (currentStep === questions.data.length) {
        setUserInfos(
          Object.assign(userInfos, {
            [question.slug]: question.isSpecial
              ? pregnancyMonth.toString()
              : answer.value,
          }),
        );
        await AsyncStorage.setItem('userInfos', JSON.stringify(userInfos))
          .then(() => {
            AsyncStorage.setItem('isOnboardingDone', 'true').then(() => {
              handleUrgencyPath();
            });
          })
          .catch(error => console.log(error));
      }
    }
  };

  const handleBackPress = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Container>
      <View style={styles.topContainer}>
        <Pressable
          onPress={() => handleBackPress()}
          style={styles.backPressable}>
          <FontAwesome5Icon
            name="chevron-left"
            size={15}
            color={Colors.primary}
          />
          <TextBase style={styles.backLinkText}>
            {t('onboarding.back') as string}
          </TextBase>
        </Pressable>
        <Progress.Bar
          progress={currentStep / questions.data.length}
          width={width * 0.9}
          color={Colors.primary}
          unfilledColor={Colors.backgroundStrong}
          borderWidth={0}
          height={8}
        />
        {questions.data.map((question, index) => {
          if (index + 1 === currentStep) {
            return (
              <View key={index} style={styles.questionContainer}>
                <Image
                  source={Images[question.image as keyof typeof Images]}
                  style={styles.image}
                />
                <TextBase
                  style={{...styles.question, width: width * 0.7}}
                  nbLines={4}>
                  {t(question.label)}
                </TextBase>
              </View>
            );
          }
        })}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainers}>
          {questions.data.map((question, index) => {
            if (index + 1 === currentStep) {
              if (question.isSpecial) {
                return (
                  <View key={index} style={styles.sliderContainer}>
                    <CustomCarousel
                      data={question.answers}
                      width={width}
                      setPrengancyMonth={e => setPrengancyMonth(e)}
                    />
                    <Pressable
                      onPress={() => {
                        handlePress({answer: question.answers[0], question});
                      }}
                      style={({pressed}) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          ...styles.confirmButton,
                        },
                      ]}>
                      <TextBase style={styles.confirmButtonText}>
                        {t('onboarding.continue')}
                      </TextBase>
                    </Pressable>
                    <Pressable
                      style={styles.pressable}
                      onPress={() => {
                        setUserInfos({
                          ...userInfos,
                          pregnancyMonth: question.specialAnswer.value,
                        });
                        setCurrentStep(currentStep + 1);
                      }}>
                      <TextBase style={{color: Colors.black}}>
                        {t(question.specialAnswer.title)}
                      </TextBase>
                    </Pressable>
                  </View>
                );
              } else if (question.verticalAnswer) {
                return (
                  <View style={styles.verticalButton}>
                    {question.answers.map((answer, verticalIndex) => {
                      return (
                        <AnswerButton
                          style={{marginBottom: 20}}
                          key={'ansVert' + verticalIndex}
                          answer={answer.label}
                          onClick={() => handlePress({answer, question})}
                        />
                      );
                    })}
                  </View>
                );
              } else {
                return question.answers.map((answer, secondIndex) => {
                  return (
                    <AnswerButton
                      key={'ans' + secondIndex}
                      answer={answer.label}
                      onClick={() => handlePress({answer, question})}
                    />
                  );
                });
              }
            }
          })}
        </View>
        <View style={styles.lastButtonContainer}>
          {questions.data.map((question, index) => {
            if (question.answerDanger?.label && index + 1 === currentStep) {
              return (
                <AnswerButton
                  key={question.slug + index}
                  answer={question.answerDanger.label}
                  onClick={() =>
                    handlePress({answer: question.answerDanger, question})
                  }
                />
              );
            } else {
              return null;
            }
          })}
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: '20%',
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  backLinkText: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: Fonts.primary,
    fontWeight: '400',
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    verticalAlign: 'flex-end',
    marginTop: 5,
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  question: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 10,
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'column',
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
  },
  buttonContainers: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 3,
    marginTop: 20,
    paddingHorizontal: 40,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
  lastButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  verticalButton: {
    flex: 1,
    flexDirection: 'column',
    height: 500,
    // justifyContent: 'space-between',
    marginVertical: 0,
  },
  pressable: {
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    marginTop: 20,
  },
});
export default Onboarding;
