import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {Fonts} from '../../styles/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextBase from '../ui/TextBase';
import {Question, Response} from '../onboarding/interface';
import _ from 'lodash';

const UserProfile = () => {
  const [situation, setSituation] = React.useState<any>();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [languages, setLanguages] = React.useState<any[]>([]);
  const [userInfos, setUserInfos] = React.useState<Record<string, string>>();
  const infos = [
    'language',
    'pregnancyMonth',
    'pregnancyFollowed',
    'medical_care',
    'housing',
  ];

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setSituation(JSON.parse(content).situation);
          setQuestions(JSON.parse(content).question?.results);
          setLanguages(JSON.parse(content).language?.results);
        }
      });
    };
    getContentFromCache();
  }, []);

  const getLanguageFromCode = (code: string) => {
    switch (code) {
      case 'fr':
        return languages.find(language => language.code === 'fr')?.nom;
      case 'en':
        return languages.find(language => language.code === 'en')?.nom;
      case 'ar':
        return languages.find(language => language.code === 'ar')?.nom;
      case 'ps':
        return languages.find(language => language.code === 'ps')?.nom;
    }
  };

  const displayUserAnswersFromQuestionCodes = (code: string) => {
    if (userInfos) {
      let pattern = /^Q/;
      if (pattern.test(code)) {
        return questions?.map((question: Question) => {
          return question.responses.map((answer: Response) => {
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
    }
  };

  const retrieveUserInfos = async () => {
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
  };

  const displayInfos = () => {
    if (!userInfos) {
      return null;
    } else {
      return infos.map((info, index) => {
        const modInfo = info
          .split('_')
          .map(e => _.startCase(e).split(' ').join(''))
          .join('');

        return (
          <View key={index} style={styles.line}>
            <View>
              <TextBase style={styles.boldText}>
                {situation[`profile${modInfo}`]}
              </TextBase>
              <TextBase>
                {displayUserAnswersFromQuestionCodes(userInfos[info])}
              </TextBase>
            </View>
            {/* <Pressable>
              <FontAwesome5Icon name="pen" size={10} color={Colors.primary} />
            </Pressable> */}
          </View>
        );
      });
    }
  };

  React.useEffect(() => {
    retrieveUserInfos();
  }, []);

  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>{situation?.profileTitle}</TextBase>
      {userInfos && displayInfos()}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  boldText: {
    fontWeight: '700',
    fontFamily: Fonts.primary,
    fontSize: 14,
    paddingBottom: 5,
  },
});
