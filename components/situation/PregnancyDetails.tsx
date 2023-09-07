import {Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts} from '../../styles/Style';
import TextBase from '../ui/TextBase';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PregnancyDetails = () => {
  const [situation, setSituation] = useState<any>();
  const [userInfos, setUserInfos] = useState<Record<string, string>>();
  const [dateEndPregnancy, setDateEndPregnancy] = useState<Date>();
  const [openModalEndPregnancy, setOpenModalEndPregnancy] = useState(false);

  useEffect(() => {
    getContentFromCache();
    retrieveUserInfos();
    // AsyncStorage.clear();
  }, []);

  useEffect(() => {
    if (dateEndPregnancy) {
      AsyncStorage.mergeItem(
        'userInfos',
        JSON.stringify({
          dateEndPregnancy: dateEndPregnancy.toLocaleDateString(
            userInfos?.language,
          ),
        }),
      );
    }
  }, [userInfos, dateEndPregnancy]);

  const getContentFromCache = () => {
    return AsyncStorage.getItem('content').then(content => {
      if (content !== null) {
        setSituation(JSON.parse(content).situation);
      }
    });
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
      JSONValues.dateEndPregnancy &&
        setDateEndPregnancy(new Date(JSONValues.dateEndPregnancy));
      tempInfos = {...tempInfos, ...JSONValues};
    } else {
      setUserInfos({});
    }
    setUserInfos(tempInfos);
  };

  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>{'Date de terme de grossesse'}</TextBase>
      <View style={styles.line}>
        {}
        <TextBase style={styles.text}>
          {dateEndPregnancy
            ? dateEndPregnancy?.toLocaleDateString(userInfos?.language)
            : 'Non renseigné'}
        </TextBase>
        <Pressable
          onPress={() => {
            setOpenModalEndPregnancy(true);
          }}>
          <TextBase style={styles.edit_button}>
            📅
            <TextBase>Saisir</TextBase>
          </TextBase>
        </Pressable>
        <DatePicker
          modal
          open={openModalEndPregnancy}
          mode="date"
          minimumDate={new Date()}
          date={new Date(userInfos?.dateEndPregnancy || new Date())}
          onConfirm={date => {
            setOpenModalEndPregnancy(false);
            setDateEndPregnancy(date);
          }}
          onCancel={() => setOpenModalEndPregnancy(false)}
        />
      </View>
    </View>
  );
};

export default PregnancyDetails;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: Colors.backgroundPrimary,
  },
  line: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
  text: {
    fontFamily: Fonts.primary,
    fontSize: 16,
  },
  edit_button: {
    marginLeft: 20,
  },
});
