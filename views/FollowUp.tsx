import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import Container from '../components/ui/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import contents from '../assets/models/followup.json';
import {useTranslation} from 'react-i18next';
import DisplayMeetings from '../components/followup/DisplayMeetings';
import {Colors, Fonts} from '../styles/Style';
import DisplaySymptomes from '../components/followup/DisplaySymptomes';

const FollowUp = () => {
  const {width, height} = useWindowDimensions();
  const styles = StyleSheet.create({
    imageContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'relative',
    },
    backgroundImage: {
      width: width,
      height: height * 0.14,
      resizeMode: 'cover',
    },
    image: {
      top: '-25%',
      zIndex: 100,
    },
    topContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      height: '70%',
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoContainer: {
      width: '100%',
      alignItems: 'center',
      position: 'relative',
      margin: 0,
      fontWeight: '700',
    },
    text: {
      fontFamily: Fonts.primary,
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '700',
      color: Colors.black,
      paddingHorizontal: 20,
    },
    pressable: {
      margin: 0,
      fontWeight: '700',
      width: 40,
    },
  });

  const {t} = useTranslation();

  const [currentMonth, setCurrentMonth] = React.useState<number>();
  const [currentContent, setCurrentContent] = React.useState<{
    title: string;
    text: string;
    list: {
      label: string;
      code: string;
    }[];
    symptoms: {
      label: string;
      slug: string;
      status: string;
      code: string;
    }[];
  }>({
    title: '',
    text: '',
    list: [],
    symptoms: [],
  });

  const retrieveUserMonth = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(
        t('onboarding.questions.question3.label'),
      );
      if (value !== null) {
        setCurrentMonth(parseInt(value, 10));
      }
    } catch (e) {
      console.log(e);
    }
  }, [t]);

  React.useEffect(() => {
    retrieveUserMonth();
  }, [retrieveUserMonth]);

  React.useEffect(() => {
    if (currentMonth) {
      setCurrentContent(contents.data[currentMonth - 1]);
    }
  }, [currentMonth]);

  const handlePress = (value: number) => {
    if (currentMonth) {
      if (currentMonth + value > 0 && currentMonth + value <= 9) {
        setCurrentMonth(currentMonth + value);
      }
    }
  };

  // React.useEffect(() => {
  //   (async () => {
  //     await AsyncStorage.clear();
  //   })();
  // }, []);

  return (
    <Container urgency={true}>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../assets/images/Ellipse.png')}
            style={styles.backgroundImage}>
            <View style={styles.topContainer}>
              <Pressable
                style={({pressed}) => [
                  styles.pressable,
                  {opacity: pressed ? 0.5 : 1},
                ]}
                onPress={() => handlePress(-1)}>
                <FontAwesome5Icon name="chevron-left" size={25} />
              </Pressable>
              {currentMonth && (
                <Text>
                  {t(currentMonth?.toString()) + ' ' + t('followup.month')}
                </Text>
              )}
              <Pressable
                style={({pressed}) => [
                  styles.pressable,
                  {opacity: pressed ? 0.5 : 1},
                ]}
                onPress={() => handlePress(1)}>
                <FontAwesome5Icon name="chevron-right" size={25} />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/baby.png')}
          />
        </View>
        <View style={styles.infoContainer}>
          {/* <Text style={styles.text}>{t(currentContent?.title)}</Text> */}
          <Text style={styles.text}>{t(currentContent?.text)}</Text>
        </View>
        <DisplayMeetings meetings={currentContent?.list} />
        <DisplaySymptomes symptomes={currentContent?.symptoms} />
      </ScrollView>
    </Container>
  );
};

export default FollowUp;
