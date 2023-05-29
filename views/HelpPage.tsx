import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import React from 'react';
import TextBase from '../components/ui/TextBase';
import {useTranslation} from 'react-i18next';
import Container from '../components/ui/Container';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../styles/Style';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import SoliGuideModule from '../components/followup/SoliguideModule';

interface Props {
  route: any;
}

const HelpPage = (props: Props) => {
  const {width, height} = useWindowDimensions();

  const styles = StyleSheet.create({
    topContainer: {
      backgroundColor: Colors.backgroundPrimary,
      paddingHorizontal: 20,
      fontWeight: '700',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: 20,
    },
    backText: {
      color: Colors.primary,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    icon: {
      fontSize: 25,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      marginLeft: 20,
    },
    middleContainer: {
      paddingHorizontal: 20,
      marginVertical: 30,
      position: 'relative',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      width: '100%',
      position: 'relative',
      marginBottom: 20,
      height: height / 10,
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
      height: height,
      paddingHorizontal: 20,
      zIndex: -1,
    },
  });

  const {route} = props;
  const {help} = route.params;
  console.log('help', help);

  const navigation = useNavigation();

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

  const {t} = useTranslation();

  return (
    <Container>
      <View style={styles.topContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({pressed}) => [
            styles.backButton,
            {opacity: pressed ? 0.5 : 1},
          ]}>
          <FontAwesome5Icon name="chevron-left" color={Colors.primary} />
          <TextBase style={styles.backText}>
            {' '}
            {t('onboarding.back') as string}
          </TextBase>
        </Pressable>
        <View style={styles.titleContainer}>
          <TextBase style={styles.icon}>{t(help.icon)}</TextBase>
          <TextBase style={styles.title}>{t(help.title)}</TextBase>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <TextBase style={styles.subtitle}>{t(help.subtext)}</TextBase>
        <View style={styles.searchContainer}>
          <View style={styles.autoCompleteContainer}>
            <Autocomplete
              inputContainerStyle={{borderWidth: 0}}
              data={geogouvData}
              hideResults={hideResults}
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
        <SoliGuideModule
          city={city}
          categories={help.code.split(',')}
          keywords={[]}
          style={'default'}
        />
      </View>
    </Container>
  );
};

export default HelpPage;
