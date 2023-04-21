import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

interface FollowUp {
  label: string;
  code: string;
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
    },
    text: {
      fontSize: 16,
      fontFamily: Fonts.primary,
      fontWeight: '600',
    },
  });

  const [followUp, setFollowUp] = React.useState<FollowUp[]>([]);

  const retrievePregnancyFollow = React.useCallback(async () => {
    const values = await AsyncStorage.getItem('userMeetingStatus');
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
          <Text style={styles.text}>{text}</Text>
        </View>
      );
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: bg}]}>
      <Text style={styles.title}>{t('situation.pregnancyFollow.title')}</Text>
      <View style={styles.listContainer}>
        {followUp.length === 0 && (
          <Text style={styles.text}>
            {t('situation.pregnancyFollow.noFollowUp')}
          </Text>
        )}
        {displayFollowUpLines()}
      </View>
    </View>
  );
};

export default PregnancyFollow;
