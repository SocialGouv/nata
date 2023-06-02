import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import TextBase from '../ui/TextBase';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import helps from '../../assets/models/helparound.json';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {MatomoTrackEvent} from '../../utils/Matomo';

interface Props {
  userInfos: Record<string, string> | undefined;
}

const DisplayHelpAround = (props: Props) => {
  const {userInfos} = props;
  const {t} = useTranslation();
  const helpsAround = JSON.parse(JSON.stringify(helps.data));
  const navigation = useNavigation();

  const handlePress = (el: any) => {
    MatomoTrackEvent(
      'FOLLOWUP',
      'FOLLOWUP_HELPAROUND_CLICK',
      t(el.title) ?? '',
    );
    navigation.navigate('HelpAround', {help: el});
  };

  const displayInfos = () => {
    if (userInfos) {
      const userHelpAround = helpsAround.find(
        (el: any) => el.key === userInfos.housing,
      );
      if (userHelpAround.list) {
        return userHelpAround.list.map((el: any) => {
          return (
            <Pressable
              key={el.title}
              onPress={() => {
                handlePress(el);
              }}
              style={({pressed}) => [
                styles.pressable,
                {opacity: pressed ? 0.5 : 1},
              ]}>
              <TextBase style={styles.icon}>{el.icon}</TextBase>
              <TextBase style={styles.text}>{t(el.title)}</TextBase>
              <FontAwesome5Icon
                name="chevron-right"
                color={Colors.black}
                style={styles.check}
              />
            </Pressable>
          );
        });
      }
    } else {
      return <TextBase>{t('help-around.no-info')}</TextBase>;
    }
  };

  return (
    <View style={styles.container}>
      <TextBase style={styles.title}>{t('help-around.title')}</TextBase>
      {displayInfos()}
    </View>
  );
};

export default DisplayHelpAround;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: Fonts.primary,
    marginBottom: 10,
  },
  pressable: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 3,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    fontSize: 25,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.primary,
  },
  check: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
});
