import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextBase from './TextBase';
import {useNavigation} from '@react-navigation/native';
import {Colors, Fonts} from '../../styles/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackButton = () => {
  const navigation = useNavigation();
  const [back, setBack] = React.useState<any>();

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(content => {
        if (content !== null) {
          setBack(JSON.parse(content).onboarding.back);
        }
      });
    };
    getContentFromCache();
  }, []);
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.backPressable}>
      <FontAwesome5Icon name="chevron-left" size={15} color={Colors.primary} />
      <TextBase style={styles.backLinkText}>{back}</TextBase>
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
