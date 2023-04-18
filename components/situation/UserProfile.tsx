import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../styles/Style';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import data from '../../assets/models/questions.json';

const UserProfile = () => {
  const {t} = useTranslation();

  const [userInfos, setUserInfos] = React.useState<Record<string, string>>();
  const infos = [
    'language',
    'pregnancyMonth',
    'pregnancyFollowed',
    'medical_care',
    'housing',
  ];

  const questions = JSON.parse(JSON.stringify(data.data));

  const getLanguageFromCode = (code: string) => {
    switch (code) {
      case 'fr':
        return t('languages.fr');
      case 'en':
        return t('languages.en');
      case 'ar':
        return t('languages.ar');
      case 'ps':
        return t('languages.ps');
    }
  };

  console.log(userInfos);

  const displayUserAnswersFromQuestionCodes = (code: string) => {
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
      JSONValues.pregnancyMonth = parseInt(JSONValues.pregnancyMonth, 10);
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
        return (
          <View key={index} style={styles.line}>
            <View>
              <Text style={styles.boldText}>
                {t(`situation.profile.${info}`)}
              </Text>
              <Text>
                {displayUserAnswersFromQuestionCodes(userInfos[info])}
              </Text>
            </View>
            <Pressable>
              <FontAwesome5Icon name="pen" size={10} color={Colors.primary} />
            </Pressable>
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
      <Text style={styles.title}>{t('situation.profile.title')}</Text>
      {userInfos && displayInfos()}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: Colors.backgroundPrimary,
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
