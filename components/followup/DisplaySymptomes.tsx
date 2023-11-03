import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../styles/Style';
import {FlatGrid} from 'react-native-super-grid';
import Images from '../../assets/models/followupImages';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UrgencyModule from './UrgencyModule';
import {MatomoTrackEvent} from '../../utils/Matomo';
import {Symptome} from './interface';
import TextBase from '../ui/TextBase';

interface Props {
  symptomes: Symptome[];
  isUrgency?: boolean;
  displayTitle?: boolean;
  currentMonth?: number;
  userSymptomesStatus?: Symptome[];
  setUserSymptomesStatus?: (value: Symptome[]) => void;
}

const DisplaySymptomes = (props: Props) => {
  const [followup, setFollowup] = React.useState<any>();

  const {
    symptomes,
    isUrgency,
    displayTitle,
    currentMonth,
    userSymptomesStatus,
    setUserSymptomesStatus,
  } = props;

  const styles = StyleSheet.create({
    container: {
      marginBottom: isUrgency ? 30 : 0,
      paddingHorizontal: 20,
    },
    title: {
      fontFamily: Fonts.primary,
      fontSize: 18,
      fontWeight: '700',
      color: Colors.black,
      lineHeight: 24,
      marginBottom: 10,
    },
    itemContainer: {
      backgroundColor: Colors.backgroundPrimary,
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 3,
      padding: 10,
      height: '100%',
      width: 130,
      justifyContent: 'flex-end',
    },
    itemName: {
      fontSize: 12,
      color: Colors.black,
      fontWeight: '600',
      textAlign: 'center',
    },
    image: {
      alignSelf: 'center',
      resizeMode: 'contain',
      width: 50,
      height: 50,
      marginBottom: 5,
    },
    checkIcon: {
      width: 20,
      height: 20,
      position: 'absolute',
      top: 5,
      right: 5,
      borderRadius: 200,
      // backgroundColor: isUrgency ? Colors.urgence : '#A56300',
      justifyContent: 'center',
      alignItems: 'center',
    },
    subText: {
      fontFamily: Fonts.primary,
      fontSize: 13,
      fontStyle: 'italic',
      marginBottom: 10,
    },
  });

  const [selectedSymptome, setSelectedSymptome] =
    React.useState<Symptome | null>();

  const retrieveUserSymptomesStatus = React.useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('userSymptomesStatus');
      if (value !== null) {
        setUserSymptomesStatus && setUserSymptomesStatus(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  }, [setUserSymptomesStatus]);

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setFollowup(JSON.parse(content).followup);
        }
      });
    };
    getContentFromCache();
  }, []);

  React.useEffect(() => {
    retrieveUserSymptomesStatus();
  }, [retrieveUserSymptomesStatus]);

  const updateUserSymptomesStatus = React.useCallback(async () => {
    if (userSymptomesStatus) {
      try {
        await AsyncStorage.setItem(
          'userSymptomesStatus',
          JSON.stringify([...userSymptomesStatus]),
        );
      } catch (e) {
        console.log(e);
      }
    }
  }, [userSymptomesStatus]);

  React.useEffect(() => {
    updateUserSymptomesStatus();
  }, [updateUserSymptomesStatus]);

  const handleSymptomSelection = (item: Symptome) => {
    MatomoTrackEvent(
      'FOLLOWUP',
      item.status === 'urgency'
        ? 'FOLLOWUP_SYMPTOM_MAJOR_CLICK'
        : 'FOLLOWUP_SYMPTOM_MINOR_CLICK',
      item.slug,
    );
    setSelectedSymptome(item);
    if (
      userSymptomesStatus &&
      userSymptomesStatus.find(
        symptome =>
          symptome.code === item.code && symptome.currentMonth === currentMonth,
      )
    ) {
      setUserSymptomesStatus &&
        setUserSymptomesStatus(
          userSymptomesStatus.filter(symptome => symptome.code !== item.code),
        );
    } else {
      setUserSymptomesStatus &&
        setUserSymptomesStatus([
          ...(userSymptomesStatus || []),
          {...item, currentMonth: currentMonth},
        ]);
    }
  };

  React.useEffect(() => {
    setSelectedSymptome(null);
  }, [currentMonth]);

  const renderItem = ({item}: {item: Symptome}) => {
    return (
      <Pressable
        onPress={() => handleSymptomSelection(item)}
        style={[
          styles.itemContainer,
          {
            borderWidth: 2,
            borderColor:
              userSymptomesStatus &&
              userSymptomesStatus.find(
                symptome =>
                  symptome.code === item.code &&
                  symptome.currentMonth === currentMonth,
              )
                ? isUrgency
                  ? Colors.urgence
                  : '#A56300'
                : Colors.border,
          },
        ]}>
        <Image
          source={Images[item.slug as keyof typeof Images]}
          style={styles.image}
        />
        <Text style={styles.itemName}>{item.title}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {displayTitle && (
        <>
          <TextBase style={styles.title}>{followup?.symptomsTitle}</TextBase>
          <TextBase style={styles.subText}>
            {followup?.symptomsIndication}
          </TextBase>
        </>
      )}
      <FlatGrid
        itemDimension={120}
        data={symptomes}
        keyExtractor={item => item.code}
        adjustGridToStyles={true}
        maxItemsPerRow={3}
        // contentContainerStyle={{height: 150}}
        horizontal={true}
        spacing={10}
        maxDimension={120}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => renderItem({item})}
      />
      {userSymptomesStatus &&
        userSymptomesStatus.find(
          symptome =>
            symptome.code === selectedSymptome?.code &&
            (symptome.status === 'urgency' ||
              symptome.status === 'minor_urgency'),
        ) && (
          <UrgencyModule
            symptom={
              userSymptomesStatus.find(
                symptome =>
                  symptome.code === selectedSymptome?.code &&
                  (symptome.status === 'urgency' ||
                    symptome.status === 'minor_urgency'),
              ) || undefined
            }
          />
        )}
    </View>
  );
};

export default DisplaySymptomes;
