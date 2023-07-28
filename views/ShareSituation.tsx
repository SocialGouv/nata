import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '../components/ui/Container';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../styles/Style';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PregnancyFollow from '../components/situation/PregnancyFollow';
import SituationSymptoms from '../components/situation/SituationSymptoms';
import {Meetings, Symptome} from '../components/followup/interface';
import TextBase from '../components/ui/TextBase';
import {MatomoTrackEvent} from '../utils/Matomo';
import _ from 'lodash';

interface Content {
  followUp: {};
  'force-update': {};
  'help-around': {};
  'helps-around': {};
  meeting: {
    results: [];
  };
  response: {
    results: {
      label: string;
      code: string;
      value: string;
    }[];
  };
  symptom: {
    results: [];
  };
}

const ShareSituation = () => {
  const navigation = useNavigation();
  const [userInfos, setUserInfos] = React.useState<Record<string, string>>();
  const [userSymptomes, setUserSymptomes] = React.useState<Symptome[]>([]);
  const [userMeetings, setUserMeetings] = React.useState<Meetings[]>();
  const [frenchContent, setFrenchContent] = React.useState<Content>();

  const getFrenchContentFromCache = () => {
    return AsyncStorage.getItem('frenchContent').then(content => {
      if (content !== null) {
        setFrenchContent(JSON.parse(content));
      }
    });
  };

  React.useEffect(() => {
    getFrenchContentFromCache();
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
      if (value !== null && frenchContent) {
        let tmpSymptomes = JSON.parse(value);
        tmpSymptomes = tmpSymptomes.map((symptome: Symptome) => {
          return frenchContent.symptom.results.find(
            (symptomeContent: Symptome) => {
              return symptomeContent.code === symptome.code;
            },
          );
        });
        setUserSymptomes(tmpSymptomes);
      }
    } catch (e) {
      console.log(e);
    }
  }, [frenchContent]);

  const retrieveUserMeetings = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userMeetingStatus');
      if (value !== null && frenchContent) {
        let tmpMeetings = JSON.parse(value);
        tmpMeetings = tmpMeetings.map((meeting: Meetings) => {
          return frenchContent.meeting.results.find(
            (meetingContent: Meetings) => {
              return meetingContent.code === meeting.code;
            },
          );
        });
        setUserMeetings(tmpMeetings);
      }
    } catch (e) {
      console.log(e);
    }
  }, [frenchContent]);

  React.useEffect(() => {
    retrieveUserInfos();
    retrieveUserSymptomes();
    retrieveUserMeetings();
    MatomoTrackEvent('PAGE_VIEW', 'PAGE_VIEW_SITUATION');
  }, [retrieveUserInfos, retrieveUserSymptomes, retrieveUserMeetings]);

  const getLanguageFromCode = (code: string): string => {
    switch (code) {
      case 'fr':
        return 'Français';
      case 'en':
        return 'Anglais';
      case 'ar':
        return 'Arabe';
      case 'ro':
        return 'Roumain';
      case 'ps':
        return 'Pashto';
      case 'fa-AF':
        return 'Dari';
      default:
        return '';
    }
  };

  const displayUserAnswersFromQuestionCodes = (code: string): string => {
    if (frenchContent) {
      let pattern = /^Q/;
      if (pattern.test(code)) {
        return frenchContent.response.results.map(response => {
          if (response.value === code) {
            return response.label;
          }
        }) as unknown as string;
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
        <PregnancyFollow
          bg={Colors.backgroundPrimary}
          title="A faire ce mois-ci"
          meetings={_.uniqBy(userMeetings, 'title')}
          noMeetingsText="Aucun rendez-vous réalisé"
        />
        <SituationSymptoms
          symptomes={_.uniqBy(userSymptomes, 'title')}
          title="Mes symptômes"
          noSymptomesText="Aucun symptôme déclaré"
        />
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
