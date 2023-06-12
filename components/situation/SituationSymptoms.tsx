import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Fonts} from '../../styles/Style';
import DisplaySymptomes from '../followup/DisplaySymptomes';
import TextBase from '../ui/TextBase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Symptome} from '../followup/interface';

interface Props {
  symptomes: Symptome[];
}

const SituationSymptoms = (props: Props) => {
  const [situation, setSituation] = React.useState<any>();
  const {symptomes} = props;

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setSituation(JSON.parse(content).situation);
        }
      });
    };
    getContentFromCache();
  }, []);

  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>{situation?.symptomsTitle}</TextBase>
      {symptomes.length === 0 && (
        <TextBase style={styles.text}>{situation?.noSymptoms}</TextBase>
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
