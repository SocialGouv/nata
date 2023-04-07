import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Container from '../../components/ui/Container';
import TextBase from '../../components/ui/TextBase';
import {Colors, Fonts} from '../../styles/Style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const OnboardingEndPath = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {t} = useTranslation();

  const strings = t(route.params.content).split('.');

  return (
    <Container>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backPressable}>
        <FontAwesome5Icon
          name="chevron-left"
          size={15}
          color={Colors.primary}
        />
        <TextBase style={styles.backLinkText}>
          {t('onboarding.back') as string}
        </TextBase>
      </Pressable>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/nata.png')} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {strings.map((string, index) => (
          <TextBase key={index} style={styles.text}>
            {string.trim()}
            {index !== strings.length - 1 ? '.' : ''}
          </TextBase>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: '35%',
    width: '100%',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    backgroundColor: Colors.backgroundPrimary,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 32,
    fontFamily: Fonts.primary,
    fontWeight: '400',
  },
  backPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  backLinkText: {
    fontSize: 16,
    paddingLeft: 5,
    lineHeight: 32,
    fontFamily: Fonts.primary,
    fontWeight: '400',
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default OnboardingEndPath;
