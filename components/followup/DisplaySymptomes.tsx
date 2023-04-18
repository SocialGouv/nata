import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import {FlatGrid} from 'react-native-super-grid';
import Images from '../../assets/models/followupImages';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import UrgencyModule from './UrgencyModule';

interface Props {
  symptomes: {
    label: string;
    slug: string;
    status: string;
    code: string;
  }[];
  isUrgency?: boolean;
  displayTitle?: boolean;
  currentMonth?: number;
  userSymptomesStatus?: Symptome[];
  setUserSymptomesStatus?: (value: Symptome[]) => void;
}

interface Symptome {
  label: string;
  slug: string;
  status: string;
  code: string;
}

const DisplaySymptomes = (props: Props) => {
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
      width: 120,
      justifyContent: 'flex-end',
    },
    itemName: {
      fontSize: 12,
      alignSelf: 'center',
      color: Colors.black,
      fontWeight: '600',
    },
    image: {
      alignSelf: 'center',
      flex: 1,
      resizeMode: 'contain',
    },
    checkIcon: {
      width: 20,
      height: 20,
      position: 'absolute',
      top: 5,
      right: 5,
      borderRadius: 200,
      backgroundColor: isUrgency ? Colors.urgence : Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const {t} = useTranslation();
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
    setSelectedSymptome(item);
    if (
      userSymptomesStatus &&
      userSymptomesStatus.find(symptome => symptome.code === item.code)
    ) {
      setUserSymptomesStatus &&
        setUserSymptomesStatus(
          userSymptomesStatus.filter(symptome => symptome.code !== item.code),
        );
    } else {
      setUserSymptomesStatus &&
        setUserSymptomesStatus([...(userSymptomesStatus || []), item]);
    }
  };

  React.useEffect(() => {
    setSelectedSymptome(null);
  }, [currentMonth]);

  const renderItem = ({
    item,
  }: {
    item: {label: string; slug: string; status: string; code: string};
  }) => {
    return (
      <Pressable
        onPress={() => handleSymptomSelection(item)}
        style={[
          styles.itemContainer,
          {
            borderColor:
              userSymptomesStatus &&
              userSymptomesStatus.find(symptome => symptome.code === item.code)
                ? isUrgency
                  ? Colors.urgence
                  : Colors.primary
                : Colors.border,
          },
        ]}>
        {userSymptomesStatus &&
          userSymptomesStatus.find(symptome => symptome.code === item.code) && (
            <View style={styles.checkIcon}>
              <FontAwesome5Icon name="check" size={12} color={Colors.white} />
            </View>
          )}
        <Image
          source={Images[item.slug as keyof typeof Images]}
          style={styles.image}
        />
        <Text style={styles.itemName}>{t(item.label)}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {displayTitle && (
        <Text style={styles.title}>{t('followup.symptomsTitle')}</Text>
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
      {isUrgency &&
        userSymptomesStatus &&
        userSymptomesStatus.find(
          symptome =>
            symptome.code === selectedSymptome?.code &&
            symptome.status === 'urgency',
        ) && <UrgencyModule />}
    </View>
  );
};

export default DisplaySymptomes;
