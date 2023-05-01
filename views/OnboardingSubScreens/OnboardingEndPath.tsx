import React from 'react';
import {useTranslation} from 'react-i18next';
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
import TextBase from '../../components/ui/TextBase';
import {Colors, Fonts} from '../../styles/Style';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import WebView from 'react-native-webview';
import Autocomplete from 'react-native-autocomplete-input';
import _ from 'lodash';

const OnboardingEndPath = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {t} = useTranslation();
  const {width, height} = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingTop: Platform.OS === 'android' ? 25 : 45,
    },
    topContainer: {
      height: '20%',
      width: '100%',
      backgroundColor: Colors.backgroundPrimary,
      paddingTop: 20,
      paddingHorizontal: 20,
      marginHorizontal: 0,
      alignItems: 'center',
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 150,
    },
    text: {
      fontSize: 16,
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
    middleContainer: {
      paddingHorizontal: 20,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '700',
      marginVertical: 10,
      fontFamily: Fonts.primary,
      paddingHorizontal: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      width: '100%',
      position: 'relative',
      height: height / 10,
    },
    autoCompleteContainer: {
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      width: width - 100,
    },
    input: {
      width: width - 100,
      backgroundColor: Colors.background,
      borderRadius: 5,
      height: 40,
      paddingHorizontal: 10,
      color: Colors.black,
    },
    searchButton: {
      backgroundColor: Colors.primary,
      width: 40,
      height: 40,
      borderRadius: 5,
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
      height: height / 2.3,
      // paddingHorizontal: 20,
      zIndex: -1,
      marginBottom: 10,
    },
    button: {
      backgroundColor: Colors.primary,
      borderRadius: 5,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      marginHorizontal: 30,
    },
    whiteText: {
      color: Colors.white,
      fontWeight: '700',
    },
  });

  const strings = t(route.params.content).split('.');
  const number = route.params.number;

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
              tmpRes.push(`${el.properties.city}`);
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

  const handlePhonePress = () => {
    Platform.OS === 'ios'
      ? Linking.openURL(`tel:${number}`)
      : Linking.openURL(`telprompt:${number.split(' ').join('')}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
          <TextBase style={styles.text}>{strings[0].trim()}</TextBase>
        </View>
        <View style={styles.middleContainer}>
          <TextBase style={styles.subtitle}>{t('urgency.subtext')}</TextBase>
          <View style={styles.searchContainer}>
            <View style={styles.autoCompleteContainer}>
              <Autocomplete
                inputContainerStyle={{borderWidth: 0}}
                data={geogouvData}
                hideResults={hideResults}
                renderTextInput={() => (
                  <TextInput
                    style={styles.input}
                    value={search}
                    onChangeText={text => {
                      setHideResults(false);
                      setSearch(text);
                      debouncedAPICall();
                    }}
                  />
                )}
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
              uri: `https://widget.soliguide.fr/search/SOLINUM/fr/none?geoValueCities=${city}&categories=100&familialle=pregnant&gender=women&price=false&bs-primary=00948b&bs-primary-dark=00948b&bs-primary-light=92d3ce&bs-secondary=e65a46&text-primary=3e3a71"`,
            }}
            automaticallyAdjustContentInsets={true}
          />
        </View>
        {number && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePhonePress()}>
            <TextBase style={styles.whiteText}>{number}</TextBase>
          </TouchableOpacity>
        )}
        <View style={styles.bottomContainer}>
          {strings.map((string, index) => {
            if (index > 0) {
              return (
                <TextBase key={index} style={styles.text}>
                  {string.trim()}
                  {index !== strings.length - 1 ? '.' : ''}
                </TextBase>
              );
            }
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default OnboardingEndPath;
