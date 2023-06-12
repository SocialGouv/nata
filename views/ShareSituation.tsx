import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '../components/ui/Container';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../styles/Style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PregnancyFollow from '../components/situation/PregnancyFollow';
import SituationSymptoms from '../components/situation/SituationSymptoms';
import {Symptome} from '../components/followup/interface';
import TextBase from '../components/ui/TextBase';
import {MatomoTrackEvent} from '../utils/Matomo';
import _ from 'lodash';

const ShareSituation = () => {
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = React.useState<Record<string, string>>();
  const [userSymptomes, setUserSymptomes] = React.useState<Symptome[]>([]);
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [languages, setLanguages] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setQuestions(JSON.parse(content).question.results);
          setLanguages(JSON.parse(content).language.results);
        }
      });
    };
    getContentFromCache();
  }, []);

  const retrieveUserInfos = React.useCallback(async () => {
    let tempInfos = {};
    const language = await AsyncStorage.getItem('language');
    if (language !== null) {
      tempInfos = {...{language: language}};
    }
    const values = await AsyncStorage.getItem('userInfos');
    if (values !== null) {
      let JSONValues = JSON.parse(values);
      JSONValues.pregnancyMonth =
        parseInt(JSONValues.pregnancyMonth, 10) === 0
          ? 1
          : parseInt(JSONValues.pregnancyMonth, 10);
      tempInfos = {...tempInfos, ...JSONValues};
    } else {
      setUserInfos({});
    }
    setUserInfos(tempInfos);
  }, []);

  const retrieveUserSymptomes = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userSymptomesStatus');
      if (value !== null) {
        setUserSymptomes(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    retrieveUserInfos();
    retrieveUserSymptomes();
    MatomoTrackEvent('PAGE_VIEW', 'PAGE_VIEW_SITUATION');
  }, [retrieveUserInfos, retrieveUserSymptomes]);

  const getLanguageFromCode = (code: string): string => {
    switch (code) {
      case 'fr':
        return languages.find(language => language.code === 'fr')?.nom;
      case 'en':
        return languages.find(language => language.code === 'en')?.nom;
      case 'ar':
        return languages.find(language => language.code === 'ar')?.nom;
      case 'ps':
        return languages.find(language => language.code === 'ps')?.nom;
      default:
        return '';
    }
  };

  const displayUserAnswersFromQuestionCodes = (code: string): string => {
    if (userInfos) {
      let pattern = /^Q/;
      if (pattern.test(code)) {
        return questions.map((question: any) => {
          return question.responses.map((answer: any) => {
            if (answer.value === code) {
              return answer.label;
            }
          });
        });
      } else {
        if (typeof code === 'number') {
          return code;
        } else {
          return getLanguageFromCode(code);
        }
      }
    } else {
      return '';
    }
  };

  const buildUserInfosString = () => {
    if (userInfos) {
      return (
        <View style={styles.textContainer}>
          <TextBase style={styles.text}>
            Je suis une femme {userInfos?.is18 ? 'majeure' : 'mineure'} enceinte
            de{' '}
            <TextBase style={styles.boldText}>
              {userInfos?.pregnancyMonth} mois.
            </TextBase>
          </TextBase>
          <TextBase style={styles.text}>
            Je parle{' '}
            <TextBase style={styles.boldText}>
              {displayUserAnswersFromQuestionCodes(userInfos.language)}
            </TextBase>
            .{' '}
            <TextBase style={styles.boldText}>
              {displayUserAnswersFromQuestionCodes(userInfos.medical_care)}
            </TextBase>{' '}
            et{' '}
            <TextBase style={styles.boldTextLowered}>
              {displayUserAnswersFromQuestionCodes(userInfos.housing)}
            </TextBase>
            .
          </TextBase>
        </View>
      );
    }
  };

  return (
    <Container>
      <ScrollView>
        <View style={styles.topContainer}>
          <Pressable style={styles.backButton} onPress={navigation.goBack}>
            <FontAwesome5Icon
              name="chevron-left"
              size={20}
              style={{marginRight: 10}}
              color={Colors.primary}
            />
            <TextBase style={styles.backText}>Retour</TextBase>
          </Pressable>
        </View>
        <View>{buildUserInfosString()}</View>
        <PregnancyFollow bg={Colors.backgroundPrimary} />
        <SituationSymptoms symptomes={_.uniqBy(userSymptomes, 'title')} />
      </ScrollView>
    </Container>
  );
};

export default ShareSituation;

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: Colors.backgroundPrimary,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  backText: {
    color: Colors.primary,
    fontSize: 16,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: '700',
    color: Colors.primary,
  },
  boldTextLowered: {
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'lowercase',
  },
});
