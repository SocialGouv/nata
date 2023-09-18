import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../styles/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextBase from '../ui/TextBase';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import RNPickerSelect from 'react-native-picker-select';
import {Question, Response} from '../onboarding/interface';
import _ from 'lodash';

const UserProfile = () => {
  const [situation, setSituation] = React.useState<any>();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [languages, setLanguages] = React.useState<any[]>([]);
  const [userInfos, setUserInfos] = React.useState<Record<string, string>>();
  const [selectedPregnancyFollowedId, setSelectedPregnancyFollowedId] =
    React.useState<string | undefined>();
  const [selectedMedicalCare, setSelectedMedicalCare] = React.useState<
    string | undefined
  >();
  const [selectedHousing, setSelectedHousing] = React.useState<
    string | undefined
  >();
  const infos = ['pregnancyFollowed', 'medical_care', 'housing', 'language'];

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

  React.useEffect(() => {
    retrieveUserInfos();
  }, []);

  React.useEffect(() => {
    if (userInfos) {
      if (selectedPregnancyFollowedId) {
        AsyncStorage.mergeItem(
          'userInfos',
          JSON.stringify({pregnancyFollowed: selectedPregnancyFollowedId}),
        );
      }
      if (selectedMedicalCare) {
        AsyncStorage.mergeItem(
          'userInfos',
          JSON.stringify({medical_care: selectedMedicalCare}),
        );
      }
      if (selectedHousing) {
        AsyncStorage.mergeItem(
          'userInfos',
          JSON.stringify({housing: selectedHousing}),
        );
      }
    }
  }, [
    userInfos,
    selectedPregnancyFollowedId,
    selectedMedicalCare,
    selectedHousing,
  ]);

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

      // setting actual data from AsyncStorage
      setSelectedPregnancyFollowedId(JSONValues.pregnancyFollowed);
      setSelectedMedicalCare(JSONValues.medical_care);
      setSelectedHousing(JSONValues.housing);

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

        const isEditable = questions?.filter(q => q.slug === info)[0]
          ?.isEditable;
        const responses = questions?.filter(q => q.slug === info)[0]?.responses;

        const radioButtons: RadioButtonProps[] = [];
        if (info === 'pregnancyFollowed' && responses) {
          responses.forEach(response => {
            radioButtons.push({
              id: response.value,
              label: response.label,
              value: response.value,
              color: Colors.primary,
              borderColor: Colors.primary,
            });
          });
        }
        const selectItems: {label: string; value: any}[] = [];
        if (info !== 'pregnancyFollowed' && responses) {
          responses.forEach(response => {
            selectItems.push({
              label: response.label,
              value: response.value,
            });
          });
        }

        return (
          <View key={index} style={styles.line}>
            <View
              style={{
                flexDirection: radioButtons.length > 1 ? 'row' : 'column',
                justifyContent: 'space-between',
                alignItems: radioButtons.length > 1 ? 'center' : 'flex-start',
                width: '100%',
              }}>
              <TextBase style={styles.boldText}>
                {situation[`profile${modInfo}`]}
              </TextBase>
              {isEditable && selectItems.length > 1 ? (
                <RNPickerSelect
                  onValueChange={value => {
                    info === 'medical_care' && setSelectedMedicalCare(value);
                    info === 'housing' && setSelectedHousing(value);
                  }}
                  items={selectItems}
                  useNativeAndroidPickerStyle={false}
                  itemKey={index}
                  placeholder={{label: '', value: ''}}
                  value={
                    info === 'medical_care'
                      ? selectedMedicalCare
                      : selectedHousing
                  }
                  style={selectStyles}
                />
              ) : (
                <>
                  {info !== 'pregnancyFollowed' && (
                    <TextBase>
                      {displayUserAnswersFromQuestionCodes(userInfos[info])}
                    </TextBase>
                  )}
                </>
              )}
              {info === 'pregnancyFollowed' && responses && (
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={data => {
                    setSelectedPregnancyFollowedId(data);
                  }}
                  selectedId={selectedPregnancyFollowedId}
                  layout="row"
                />
              )}
            </View>
          </View>
        );
      });
    }
  };

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
    backgroundColor: Colors.backgroundPrimary,
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
    paddingVertical: 10,
  },
  boldText: {
    fontWeight: '700',
    fontFamily: Fonts.primary,
    fontSize: 14,
    paddingBottom: 5,
  },
});

const selectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    fontFamily: Fonts.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    position: 'relative',
  },
  inputAndroid: {
    width: '100%',
    minWidth: '100%',
    fontSize: 14,
    fontFamily: Fonts.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    position: 'relative',
    color: Colors.black,
  },
  chevron: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
