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
} from 'react-native';
import React from 'react';
import Container from '../components/ui/Container';
import {Colors, Fonts} from '../styles/Style';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TextBase from '../components/ui/TextBase';
import {useTranslation} from 'react-i18next';
import WebView from 'react-native-webview';
import AutocompleteInput from 'react-native-autocomplete-input';
import _ from 'lodash';

interface Props {
  route: any;
}

const UrgencyPage = (props: Props) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {width, height} = useWindowDimensions();
  const {title, number} = props.route.params;

  const titleTodisplay = title ? title : (t('urgency.title') as string);

  const [geogouvData, setGeogouvData] = React.useState<any[]>([]);
  const [hideResults, setHideResults] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>();
  const [city, setCity] = React.useState<string>('Paris');

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

  const styles = StyleSheet.create({
    topContainer: {
      backgroundColor: Colors.backgroundUrgence,
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
      height: height / 2.8,
      paddingHorizontal: 20,
      backgroundColor: Colors.backgroundUrgence,
      zIndex: -1,
    },
    continueText: {
      fontSize: 16,
      color: Colors.primary,
      fontWeight: '700',
      marginTop: 20,
      textDecorationLine: 'underline',
      alignSelf: 'center',
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
    },
    whiteText: {
      color: Colors.white,
      fontWeight: '700',
    },
  });

  const handlePhonePress = () => {
    Platform.OS === 'ios'
      ? Linking.openURL(`tel:${number.replace(/\s+/g, '')}`)
      : Linking.openURL(`telprompt:${number.replace(/\s+/g, '')}`);
  };

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
            <TextBase style={styles.icon}>🚨</TextBase>
            <TextBase style={styles.title}>{titleTodisplay}</TextBase>
          </View>
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
              {t('urgency.button') as string}
            </TextBase>
          </Pressable> */}
          {number && (
            <>
              <TextBase style={{marginBottom: 20}}>
                {t('urgency.solipamtext')}
              </TextBase>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePhonePress()}>
                <TextBase style={styles.whiteText}>{number}</TextBase>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.middleContainer}>
          <TextBase style={styles.subtitle}>{t('urgency.subtext')}</TextBase>
          <View style={styles.searchContainer}>
            <View style={styles.autoCompleteContainer}>
              <AutocompleteInput
                inputContainerStyle={{borderWidth: 0}}
                data={geogouvData}
                hideResults={hideResults}
                flatListProps={{
                  renderItem: ({item}) => (
                    <TouchableOpacity
                      style={styles.displayResults}
                      onPress={() => {
                        setSearch(item), setHideResults(false);
                      }}>
                      <TextBase>{item}</TextBase>
                    </TouchableOpacity>
                  ),
                }}
                renderTextInput={() => (
                  <TextInput
                    style={styles.input}
                    placeholder={t('urgency.search') as string}
                    value={search}
                    onChangeText={text => {
                      setHideResults(false);
                      setSearch(text);
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
          <WebView
            scalesPageToFit={true}
            showsVerticalScrollIndicator={false}
            bounces={false}
            javaScriptEnabled
            useWebView2={true}
            source={{
              uri: `https://widget.soliguide.fr/search/SOLINUM/fr/none?geoValueCities=${city}&categories=100,1100,401,405,406,407,408,404&familialle=pregnant&gender=women&price=false&bs-primary=ca1c11&bs-primary-dark=ca1c11&bs-primary-light=d77770&bs-secondary=e65a46&text-primary=3e3a71`,
            }}
            automaticallyAdjustContentInsets={true}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('FollowUp')}>
          <TextBase style={styles.continueText}>
            {t('urgency.continue') as string}
          </TextBase>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default UrgencyPage;
