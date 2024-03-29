import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../styles/Style';
import TextBase from '../ui/TextBase';
import {MatomoTrackEvent} from '../../utils/Matomo';

interface Language {
  code: string;
  nom: string;
  actif: boolean;
  image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface Props {
  selectedLanguage: string | undefined;
  changeLanguage: (language: string) => void;
  languages: Language[];
}

const LanguageSelector = (props: Props) => {
  const {selectedLanguage, changeLanguage, languages} = props;
  const flatListRef = React.useRef<FlatList>(null);

  const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      paddingHorizontal: 20,
      flex: 1,
      alignContent: 'center',
      marginHorizontal: 'auto',
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 30,
    },
    button: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.black,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
  });

  useEffect(() => {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        flatListRef.current?.flashScrollIndicators();
      }, 500);
      setInterval(() => {
        flatListRef.current?.flashScrollIndicators();
      }, 10000);
    }
  }, []);

  return (
    <ScrollView horizontal indicatorStyle="black">
      <FlatList
        data={languages}
        style={styles.gridView}
        persistentScrollbar
        ref={flatListRef}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                changeLanguage(item.code);
                MatomoTrackEvent(
                  'ONBOARDING',
                  'ONBOARDING_LANGUAGE_CHOOSE',
                  item.nom,
                );
              }}
              style={[
                styles.button,
                {
                  borderColor:
                    item.code === selectedLanguage
                      ? Colors.primary
                      : Colors.black,
                  borderWidth: item.code === selectedLanguage ? 2 : 1,
                  backgroundColor:
                    item.code === selectedLanguage ? '#C6E2DC' : Colors.white,
                },
              ]}>
              {item.image && (
                <Image
                  source={{
                    uri:
                      'https://nata-bo.numericite.eu' +
                      item.image.data.attributes.url,
                  }}
                  style={styles.image}
                />
              )}
              <TextBase>{item.nom}</TextBase>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

export default LanguageSelector;
