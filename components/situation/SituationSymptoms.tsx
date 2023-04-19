import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Fonts} from '../../styles/Style';
import DisplaySymptomes from '../followup/DisplaySymptomes';

interface Props {
  symptomes: {
    label: string;
    slug: string;
    status: string;
    code: string;
  }[];
}

const SituationSymptoms = (props: Props) => {
  const {symptomes} = props;
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('situation.symptoms.title')}</Text>
      {symptomes.length === 0 && (
        <Text style={styles.text}>{t('situation.symptoms.noSymptoms')}</Text>
      )}
      <DisplaySymptomes symptomes={symptomes} displayTitle={false} />
    </View>
  );
};

export default SituationSymptoms;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
  text: {
    marginHorizontal: 20,
    fontFamily: Fonts.primary,
  },
});
