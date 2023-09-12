import {Pressable, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors, Fonts} from '../../styles/Style';
import TextBase from '../ui/TextBase';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../AppContext';

const PregnancyDetails = () => {
  const {setCurrentMonth} = useContext(AppContext);

  const [situation, setSituation] = useState<any>();
  const [userInfos, setUserInfos] = useState<Record<string, string>>();
  const [dateEndPregnancy, setDateEndPregnancy] = useState<Date>();
  const [openModalEndPregnancy, setOpenModalEndPregnancy] = useState(false);

  useEffect(() => {
    getContentFromCache();
    retrieveUserInfos();
  }, []);

  useEffect(() => {
    if (
      dateEndPregnancy &&
      userInfos &&
      new Date(userInfos.dateEndPregnancy) !== dateEndPregnancy
    ) {
      AsyncStorage.mergeItem(
        'userInfos',
        JSON.stringify({
          dateEndPregnancy: dateEndPregnancy.toJSON(),
        }),
      );

      // caclulate current month
      const currentDate = new Date();
      const diffTime = Math.abs(
        dateEndPregnancy.getTime() - currentDate.getTime(),
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      let tmpMonth = 9 - diffMonths;
      tmpMonth = tmpMonth === 0 ? 1 : tmpMonth;
      setCurrentMonth(tmpMonth);
      AsyncStorage.mergeItem(
        'userInfos',
        JSON.stringify({pregnancyMonth: diffMonths === 0 ? 9 : tmpMonth}),
      );
    }
  }, [userInfos, dateEndPregnancy, setCurrentMonth]);

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
      <TextBase style={styles.title}>{situation?.dateOfBirthTitle}</TextBase>
      <Pressable
        onPress={() => {
          setOpenModalEndPregnancy(true);
        }}>
        <View style={styles.line}>
          <TextBase style={styles.text}>
            {dateEndPregnancy
              ? dateEndPregnancy?.toLocaleDateString(userInfos?.language)
              : situation?.dateOfBirthPlaceholder}
          </TextBase>
          <DatePicker
            modal
            confirmText={situation?.dateOfBirthConfirm}
            cancelText={situation?.dateOfBirthCancel}
            open={openModalEndPregnancy}
            mode="date"
            minimumDate={new Date()}
            maximumDate={
              new Date(new Date().setMonth(new Date().getMonth() + 9))
            }
            date={new Date(userInfos?.dateEndPregnancy || new Date())}
            onConfirm={date => {
              setOpenModalEndPregnancy(false);
              setDateEndPregnancy(date);
            }}
            onCancel={() => setOpenModalEndPregnancy(false)}
          />
          <TextBase style={styles.edit_button}>📅</TextBase>
        </View>
      </Pressable>
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
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primary,
    marginBottom: 10,
  },
  text: {
    fontFamily: Fonts.primary,
    fontSize: 16,
  },
  edit_button: {
    marginRight: 20,
  },
});
