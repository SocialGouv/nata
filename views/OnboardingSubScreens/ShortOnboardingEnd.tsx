import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../components/ui/Container';
import TextBase from '../../components/ui/TextBase';
import {useTranslation} from 'react-i18next';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors, Fonts} from '../../styles/Style';
import Images from '../../assets/models/onboardingImages';

const ShortOnboardingEnd = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {content, image} = route.params;
  const {t} = useTranslation();

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
        <TextBase style={styles.text}>{t(content)}</TextBase>
        {image && (
          <Image
            source={Images[image as keyof typeof Images]}
            style={styles.image}
          />
        )}
      </View>
    </Container>
  );
};

export default ShortOnboardingEnd;

const styles = StyleSheet.create({
  topContainer: {
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 32,
    fontWeight: '400',
    textAlign: 'center',
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
  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
