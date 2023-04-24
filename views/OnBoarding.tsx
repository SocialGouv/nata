import React, {useContext, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import questions from '../assets/models/questions.json';
import Container from '../components/ui/Container';
import {Image, Pressable, View} from 'react-native';
import {Text} from 'react-native';
import AnswerButton from '../components/onboarding/AnswerButton';
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../styles/Style';
import {useWindowDimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import SliderItem from '../components/onboarding/SliderItem';
import Images from '../assets/models/onboardingImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext';

interface PressFunction {
  answer: {
    label: string;
    value: string;
    redirectScreen?: boolean;
    redirectScreenContent?: string | undefined;
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

const Onboarding = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const carouselRef = React.useRef(null);
  const [pregnancyMonth, setPrengancyMonth] = React.useState<number>(5);
  const [userInfos, setUserInfos] = React.useState({});

  const {setIsOnboardingDone, setDisplayInitialModal} = useContext(AppContext);

  const {t} = useTranslation();

  const handlePress = async ({answer, question}: PressFunction) => {
    if (answer.redirectScreen && !question.isSpecial) {
      navigation.navigate('OnboardingEndPath', {
        content: answer.redirectScreenContent,
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
              setIsOnboardingDone(true);
              setDisplayInitialModal(true);
              navigation.navigate('FollowUp');
            });
          })
          .catch(error => console.log(error));
      }
    }
  };

  // const getData = async () => {
  //   try {
  //     const values = await AsyncStorage.getAllKeys();
  //     console.log('values', values);
  //     const keys = await AsyncStorage.multiGet(values);
  //     console.log('keys', keys);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, [currentStep]);

  return (
    <Container>
      <View style={styles.topContainer}>
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
                <Text
                  style={{...styles.question, width: width * 0.7}}
                  numberOfLines={4}>
                  {t(question.label)}
                </Text>
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
                    <Carousel
                      ref={carouselRef}
                      data={question.answers}
                      layout={'default'}
                      layoutCardOffset={50}
                      firstItem={4}
                      renderItem={({item, index}) => (
                        <SliderItem item={item} index={index + 1} />
                      )}
                      sliderWidth={width - 40}
                      itemWidth={width * 0.5}
                      onSnapToItem={carouselIndex =>
                        setPrengancyMonth(carouselIndex + 1)
                      }
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
                      <Text style={styles.confirmButtonText}>
                        {t('onboarding.continue')}
                      </Text>
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
                  key={index}
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
    paddingTop: 20,
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
    marginVertical: 20,
  },
});
export default Onboarding;
