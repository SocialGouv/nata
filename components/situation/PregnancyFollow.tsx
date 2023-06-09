import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../styles/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import TextBase from '../ui/TextBase';
import {Meetings} from '../followup/interface';

interface Props {
  bg?: string;
}

const PregnancyFollow = (props: Props) => {
  const [situation, setSituation] = React.useState<any>();
  const {bg} = props;
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

  const [followUp, setFollowUp] = React.useState<Meetings[]>([]);

  const retrievePregnancyFollow = React.useCallback(async () => {
    const values = await AsyncStorage.getItem('userMeetingStatus');
    if (values) {
      setFollowUp(JSON.parse(values));
    } else {
      setFollowUp([]);
    }
  }, []);

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

  React.useEffect(() => {
    retrievePregnancyFollow();
  }, [retrievePregnancyFollow, isFocused]);

  const displayFollowUpLines = () => {
    const labelCounts: Record<string, number> = followUp.reduce(
      (acc: Record<string, number>, el) => {
        acc[el.title] = (acc[el.title] || 0) + 1;
        return acc;
      },
      {},
    );

    return Object.entries(labelCounts).map(([label, count]) => {
      const key = `${label}_${count}`;
      const text = count > 1 ? `${label} : ${count}` : label;
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
        {situation?.pregnancyFollowTitle}
      </TextBase>
      <View style={styles.listContainer}>
        {followUp.length === 0 && (
          <TextBase style={styles.text}>{situation?.noFollowUp}</TextBase>
        )}
        {displayFollowUpLines()}
      </View>
    </View>
  );
};

export default PregnancyFollow;
