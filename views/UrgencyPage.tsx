import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Container from '../components/ui/Container';
import {Colors, Fonts} from '../styles/Style';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextBase from '../components/ui/TextBase';
import {useTranslation} from 'react-i18next';
import WebView from 'react-native-webview';

const UrgencyPage = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {width, height} = useWindowDimensions();

  const styles = StyleSheet.create({
    topContainer: {
      backgroundColor: Colors.backgroundPrimary,
      // flex: 0.25,
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
      color: Colors.urgence,
      textDecorationLine: 'underline',
    },
    title: {
      fontSize: 18,
      paddingHorizontal: 20,
      width: '90%',
      lineHeight: 28,
      fontWeight: '700',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
    },
    explanationContainer: {
      flex: 0.75,
      paddingTop: 20,
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    explanation: {
      fontSize: 16,
    },
    pressable: {
      marginTop: 20,
      width: '70%',
      borderColor: Colors.urgence,
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 10,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: Colors.urgence,
      fontWeight: '700',
    },
    webview: {
      width: width,
      height: height / 3,
      paddingHorizontal: 20,
    },
  });

  return (
    <Container urgency={true}>
      <ScrollView>
        <View style={styles.topContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backPressable}>
            <FontAwesome5Icon
              name="chevron-left"
              size={15}
              color={Colors.urgence}
            />
            <TextBase style={styles.backLinkText}>
              {t('onboarding.back') as string}
            </TextBase>
          </Pressable>
          <View style={styles.titleContainer}>
            <FontAwesome5Icon
              name="exclamation-triangle"
              size={50}
              color={Colors.urgence}
            />
            <TextBase style={styles.title}>
              {t('urgency.title') as string}
            </TextBase>
          </View>
        </View>
        <View style={styles.explanationContainer}>
          <TextBase style={styles.explanation}>
            {t('urgency.explanation') as string}
          </TextBase>
          <Pressable
            style={({pressed}) => [
              styles.pressable,
              pressed && {
                opacity: 0.5,
              },
            ]}>
            <TextBase style={styles.buttonText}>
              {t('urgency.button') as string}
            </TextBase>
          </Pressable>
        </View>
        <WebView
          scalesPageToFit={true}
          bounces={false}
          style={styles.webview}
          javaScriptEnabled
          useWebView2={true}
          source={{
            uri: 'https://widget.soliguide.fr/search/SOLINUM/fr/none?geoValueCountries=france&categories=100,1100,401,405,406,407,408,404&familialle=pregnant&gender=women&price=false&bs-primary=ca1c11&bs-primary-dark=ca1c11&bs-primary-light=d77770&bs-secondary=e65a46&text-primary=3e3a71',
          }}
          automaticallyAdjustContentInsets={true}
        />
      </ScrollView>
    </Container>
  );
};

export default UrgencyPage;
