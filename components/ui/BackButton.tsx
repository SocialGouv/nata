import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextBase from './TextBase';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts} from '../../styles/Style';

const BackButton = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.backPressable}>
      <FontAwesome5Icon name="chevron-left" size={15} color={Colors.primary} />
      <TextBase style={styles.backLinkText}>
        {t('onboarding.back') as string}
      </TextBase>
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  backLinkText: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: Fonts.primary,
    fontWeight: '400',
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});
