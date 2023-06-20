import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Image,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Container from '../components/ui/Container';
import {Colors, Fonts} from '../styles/Style';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextBase from '../components/ui/TextBase';
import AutocompleteInput from 'react-native-autocomplete-input';
import _ from 'lodash';
import AppContext from '../AppContext';
import SoliGuideModule from '../components/followup/SoliguideModule';
import {MatomoTrackEvent} from '../utils/Matomo';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props {
  route: any;
}

const UrgencyPage = (props: Props) => {
  const [urgency, setUrgency] = React.useState<any>();

  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const {title, number, keywords, back} = props.route.params;

  const titleTodisplay = title ? title : urgency?.title;

  const [geogouvData, setGeogouvData] = React.useState<any[]>([]);
  const [hideResults, setHideResults] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();
  const [city, setCity] = React.useState<string>('');

  const {
    setIsEmergencyOnBoardingDone,
    setDisplayInitialModal,
    isEmergencyOnBoardingDone,
  } = useContext(AppContext);

  useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then((data: any) => {
        if (data !== null) {
          setUrgency(JSON.parse(data).urgency);
        }
      });
    };

    getContentFromCache();
  }, []);

  const handleAutocomplete = React.useCallback(async () => {
    if (search && search.length > 1) {
      fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${search}&type=municipality&autocomplete=1`,
      )
        .then(res => res.json())
        .then(res => {
          if (res && res.features && res.features.length > 0) {
            let tmpRes: any[] = [];
            res.features.map((el: any) => {
              tmpRes.push(
                `${el.properties.city}` + ' ' + `${el.properties.postcode}`,
              );
            });
            setGeogouvData(tmpRes);
          }
        })
        .catch(err => console.log(err));
    } else {
      setGeogouvData([]);
      setHideResults(true);
    }
  }, [search]);

  const debouncedAPICall = React.useMemo(
    () => _.debounce(() => handleAutocomplete(), 300),
    [handleAutocomplete],
  );

  const handlePressSearch = () => {
    if (search) {
      setCity(search.split(' ')[0]);
      setHideResults(true);
    }
  };

  useEffect(() => {
    MatomoTrackEvent('PAGE_VIEW', 'PAGE_VIEW_URGENCY');
  }, []);

  const styles = StyleSheet.create({
    topContainer: {
      backgroundColor: Colors.backgroundUrgence,
      // flex: 0.25,
    },
    underTopContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    underTopLabel: {
      fontWeight: '900',
      fontSize: 20,
    },
    underTopLabelRed: {
      fontWeight: '900',
      fontSize: 20,
      color: Colors.urgence,
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
      fontSize: 20,
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
      padding: 20,
      zIndex: -1,
    },
    explanationText: {
      padding: 20,
      fontSize: 18,
      fontWeight: '500',
    },
    explanationTextBlue: {
      padding: 20,
      fontSize: 18,
      fontWeight: '500',
      color: Colors.lightPrimary,
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
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 16,
      color: Colors.urgence,
      fontWeight: '700',
    },
    middleContainer: {
      paddingHorizontal: 20,
      marginTop: 30,
      position: 'relative',
      backgroundColor: '#FCF3F3',
      paddingVertical: 20,
      justifyContent: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '700',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      width: '100%',
      position: 'relative',
      height: height / 20,
      marginBottom: 20,
    },
    autoCompleteContainer: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      width: width - 100,
    },
    input: {
      width: width - 100,
      backgroundColor: Colors.white,
      borderRadius: 5,
      marginTop: 10,
      height: 40,
      paddingHorizontal: 10,
      color: Colors.black,
    },
    searchButton: {
      backgroundColor: Colors.urgence,
      width: 40,
      height: 40,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
    },
    displayResults: {
      backgroundColor: '#FFF',
      paddingVertical: 12,
      paddingLeft: 22,
      height: 'auto',
      borderWidth: 0,
    },
    webview: {
      width: width,
      paddingHorizontal: 20,
      backgroundColor: Colors.backgroundUrgence,
      zIndex: -1,
    },
    continueContainer: {
      zIndex: -1,
    },
    continueText: {
      fontSize: 16,
      color: Colors.primary,
      backgroundColor: Colors.backgroundUrgence,
      padding: 10,
      borderRadius: 50,
      fontWeight: '700',
      marginTop: 20,
      marginBottom: 50,
      textDecorationLine: 'underline',
      alignSelf: 'center',
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {width: 2, height: 2},
    },
    icon: {
      fontSize: 30,
    },
    button: {
      backgroundColor: Colors.urgence,
      borderRadius: 5,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 5,
      marginHorizontal: 30,
      display: 'flex',
      flexDirection: 'row',
    },
    imgPhone: {
      marginEnd: 20,
    },
    whiteText: {
      color: Colors.white,
      fontWeight: '700',
      fontSize: 18,
    },
  });

  const handlePhonePress = () => {
    Platform.OS === 'ios'
      ? Linking.openURL(`tel:${number.replace(/\s+/g, '')}`)
      : Linking.openURL(`telprompt:${number.replace(/\s+/g, '')}`);
  };

  return (
    <Container urgency={true}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.topContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backPressable}>
            <FontAwesome5Icon
              name="chevron-left"
              size={15}
              color={Colors.urgence}
            />
            <TextBase style={styles.backLinkText}>{back}</TextBase>
          </Pressable>
          <View style={styles.titleContainer}>
            <TextBase style={styles.icon}>🚨</TextBase>
            <TextBase style={styles.title}>{titleTodisplay}</TextBase>
          </View>
        </View>
        <View style={styles.underTopContainer}>
          <TextBase style={styles.underTopLabel}>
            {urgency?.subtext.split('-').map((item: any, key: any) => {
              return (
                <TextBase
                  key={key}
                  style={
                    key % 2 === 0
                      ? styles.underTopLabel
                      : styles.underTopLabelRed
                  }>
                  {item}
                </TextBase>
              );
            })}
          </TextBase>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.searchContainer}>
            <View style={styles.autoCompleteContainer}>
              <AutocompleteInput
                inputContainerStyle={{borderWidth: 0}}
                data={geogouvData}
                hideResults={hideResults}
                flatListProps={{
                  keyboardShouldPersistTaps: 'always',
                  renderItem: ({item}) => (
                    <TouchableOpacity
                      style={styles.displayResults}
                      onPress={() => {
                        setSearch(item);
                        setHideResults(false);
                        Keyboard.dismiss();
                      }}>
                      <TextBase>{item}</TextBase>
                    </TouchableOpacity>
                  ),
                }}
                renderTextInput={() => (
                  <TextInput
                    style={styles.input}
                    placeholder={urgency?.search}
                    value={search}
                    onChangeText={text => {
                      setHideResults(false);
                      setSearch(text);
                      MatomoTrackEvent('URGENCY', 'URGENCY_SEARCH');
                      debouncedAPICall();
                    }}
                  />
                )}
              />
            </View>
            <TouchableOpacity
              disabled={!search}
              onPress={() => handlePressSearch()}
              style={styles.searchButton}>
              <FontAwesome5Icon name="search" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.webview}>
          {city !== '' && (
            <SoliGuideModule
              city={city}
              categories={[107]}
              keywords={keywords}
              style={'urgent'}
              matomo={'URGENCY'}
            />
          )}
        </View>
        <View style={styles.explanationContainer}>
          {/* <Pressable
            onPress={() => navigation.navigate('FollowUp')}
            style={({pressed}) => [
              styles.pressable,
              pressed && {
                opacity: 0.5,
              },
            ]}>
            <TextBase style={styles.buttonText}>
              {urgency?.button}
            </TextBase>
          </Pressable> */}
          {number && (
            <>
              <TextBase style={styles.explanationContainer}>
                {urgency?.solipamtext.split('-').map((item: any, key: any) => {
                  return (
                    <TextBase
                      key={key}
                      style={
                        key % 2 === 0
                          ? styles.explanationText
                          : styles.explanationTextBlue
                      }>
                      {item}
                    </TextBase>
                  );
                })}
              </TextBase>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePhonePress()}>
                <Image
                  style={styles.imgPhone}
                  source={require('../assets/images/phone.png')}
                />
                <TextBase style={styles.whiteText}>{number}</TextBase>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.continueContainer}>
          <TouchableOpacity
            onPress={() => {
              if (!isEmergencyOnBoardingDone) {
                setIsEmergencyOnBoardingDone(true);
                setDisplayInitialModal(true);
                MatomoTrackEvent('URGENCY', 'URGENCY_STAY_ON_APP');
              }
              navigation.navigate('FollowUp');
            }}>
            <TextBase style={styles.continueText}>{urgency?.continue}</TextBase>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

export default UrgencyPage;
