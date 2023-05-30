import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '../components/ui/Container';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../styles/Style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import PregnancyFollow from '../components/situation/PregnancyFollow';
import SituationSymptoms from '../components/situation/SituationSymptoms';
import {Symptome} from '../components/followup/interface';
import data from '../assets/models/questions.json';
import TextBase from '../components/ui/TextBase';
import {MatomoTrackEvent} from '../utils/Matomo';

const ShareSituation = () => {
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = React.useState<Record<string, string>>();
  const [userSymptomes, setUserSymptomes] = React.useState<Symptome[]>([]);
  const questions = JSON.parse(JSON.stringify(data.data));

  const {t, i18n} = useTranslation();

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
    i18n.changeLanguage('fr');
    retrieveUserInfos();
    retrieveUserSymptomes();
    MatomoTrackEvent('PAGE_VIEW', 'PAGE_VIEW_SITUATION');
  }, [retrieveUserInfos, retrieveUserSymptomes, i18n]);

  const getLanguageFromCode = (code: string): string => {
    switch (code) {
      case 'fr':
        return t('languages.fr');
      case 'en':
        return t('languages.en');
      case 'ar':
        return t('languages.ar');
      case 'ps':
        return t('languages.ps');
      default:
        return '';
    }
  };

  const displayUserAnswersFromQuestionCodes = (code: string): string => {
    if (userInfos) {
      let pattern = /^Q/;
      if (pattern.test(code)) {
        return questions.map((question: any) => {
          return question.answers.map((answer: any) => {
            if (answer.value === code) {
              return t(answer.label);
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
        <SituationSymptoms symptomes={userSymptomes} />
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
