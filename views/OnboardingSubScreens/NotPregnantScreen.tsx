import React from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextBase from '../../components/ui/TextBase';
import {Colors, Fonts} from '../../styles/Style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Markdown from '@ronradtke/react-native-markdown-display';

const NotPregnantScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {back, continueText, content, onContinue} = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    topContainer: {
      width: '100%',
      backgroundColor: Colors.backgroundPrimary,
      paddingHorizontal: 20,
      paddingTop: Platform.OS === 'android' ? 25 : 45,
      paddingBottom: 20,
      marginHorizontal: 0,
      alignItems: 'center',
    },
    bottomContainer: {
      alignItems: 'center',
      textAlign: 'center',
      paddingHorizontal: 20,
      paddingVertical: 40,
      zIndex: -1,
    },
    backPressable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      paddingBottom: 10,
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
    mdTitle: {
      textAlign: 'center',
      fontSize: 22,
      fontFamily: Fonts.primary,
      color: Colors.black,
    },
    mdText: {
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 16,
      fontFamily: Fonts.primary,
      fontWeight: '400',
    },
    boldText: {
      fontSize: 16,
      lineHeight: 32,
      fontFamily: Fonts.primary,
      fontWeight: '900',
    },
    continueButton: {
      width: '100%',
      alignItems: 'center',
      marginTop: 40,
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 10,
      paddingHorizontal: 40,
    },
    continueButtonText: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: '700',
      fontFamily: Fonts.primary,
    },
  });

  const regexColorText = /-(.+)-/g;
  const title: string = content?.split('$title$')[0];
  const mainTexts: string[] = content
    ?.split('$title$')[1]
    ?.split(regexColorText);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.topContainer}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backPressable}>
              <FontAwesome5Icon
                name="chevron-left"
                size={15}
                color={Colors.primary}
              />
              <TextBase style={styles.backLinkText}>{back}</TextBase>
            </Pressable>
            <Markdown style={{body: styles.mdTitle}}>{title?.trim()}</Markdown>
          </View>
          <View style={styles.bottomContainer}>
            {mainTexts?.map((text, index) => (
              <Markdown
                key={index}
                style={{
                  body:
                    index % 2 === 0
                      ? styles.mdText
                      : {
                          ...styles.mdText,
                          fontWeight: 'bold',
                          color: Colors.primary,
                        },
                }}>
                {text}
              </Markdown>
            ))}
            <Pressable
              onPress={() => {
                onContinue();
                navigation.goBack();
              }}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  ...styles.continueButton,
                },
              ]}>
              <TextBase style={styles.continueButtonText}>
                {continueText}
              </TextBase>
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NotPregnantScreen;
