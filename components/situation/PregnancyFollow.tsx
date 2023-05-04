import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import TextBase from '../ui/TextBase';

interface FollowUp {
  label: string;
  code: string;
  max_month: number;
  nbOfOccurence?: number;
}

interface Props {
  bg?: string;
}

const PregnancyFollow = (props: Props) => {
  const {bg} = props;
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: bg ? 0 : 20,
      marginVertical: bg ? 0 : 40,
      paddingHorizontal: bg ? 20 : 0,
      paddingVertical: bg ? 20 : 0,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      fontFamily: Fonts.primary,
    },
    listContainer: {
      marginVertical: 20,
    },
    line: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      marginRight: 25,
    },
    text: {
      fontSize: 16,
      fontFamily: Fonts.primary,
      fontWeight: '600',
    },
  });

  const [followUp, setFollowUp] = React.useState<FollowUp[]>([]);

  const retrievePregnancyFollow = React.useCallback(async () => {
    console.log('all keys', await AsyncStorage.getAllKeys());
    console.log(await AsyncStorage.getItem('userInfos'));
    const values = await AsyncStorage.getItem('userMeetingStatus');
    console.log('values preg follow', values);
    if (values) {
      setFollowUp(JSON.parse(values));
    } else {
      setFollowUp([]);
    }
  }, []);

  React.useEffect(() => {
    retrievePregnancyFollow();
  }, [retrievePregnancyFollow, isFocused]);

  const displayFollowUpLines = () => {
    const labelCounts: Record<string, number> = followUp.reduce(
      (acc: Record<string, number>, el) => {
        acc[t(el.label)] = (acc[t(el.label)] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(labelCounts).map(([label, count]) => {
      const key = `${label}_${count}`;
      const text = count > 1 ? `${t(label)} : ${count}` : t(label);
      return (
        <View style={styles.line} key={key}>
          <BouncyCheckbox
            disabled
            isChecked={true}
            fillColor={Colors.primary}
            size={25}
          />
          <TextBase style={styles.text}>{text}</TextBase>
        </View>
      );
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: bg}]}>
      <TextBase style={styles.title}>
        {t('situation.pregnancyFollow.title')}
      </TextBase>
      <View style={styles.listContainer}>
        {followUp.length === 0 && (
          <TextBase style={styles.text}>
            {t('situation.pregnancyFollow.noFollowUp')}
          </TextBase>
        )}
        {displayFollowUpLines()}
      </View>
    </View>
  );
};

export default PregnancyFollow;
