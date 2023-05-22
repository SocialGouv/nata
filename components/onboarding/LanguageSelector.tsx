import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import languages from '../../assets/models/languages';
import {Colors} from '../../styles/Style';
import TextBase from '../ui/TextBase';
import {useMatomo} from 'matomo-tracker-react-native';
import Matomo from 'react-native-matomo';

interface Props {
  selectedLanguage: string | undefined;
  changeLanguage: (language: string) => void;
}

const LanguageSelector = (props: Props) => {
  const {selectedLanguage, changeLanguage} = props;
  const {trackEvent} = useMatomo();
  const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
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

  return (
    <FlatList
      data={languages}
      showsVerticalScrollIndicator={false}
      style={styles.gridView}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={async () => {
            changeLanguage(item.code);
            let tracking = await trackEvent({
              category: 'ONBOARDING',
              action: 'ONBOARDING_LANGUAGE_CHOOSE',
              name: item.name,
            });
            console.log('test : ', tracking);
            let test2 = Matomo.trackEvent(
              'ONBOARDING',
              'ONBOARDING_LANGUAGE_CHOOSE',
              item.name,
            );
            console.log('test 2 : ', test2);
          }}
          style={[
            styles.button,
            {
              borderColor:
                item.code === selectedLanguage ? Colors.primary : Colors.black,
              borderWidth: item.code === selectedLanguage ? 2 : 1,
            },
          ]}>
          <Image source={item.flag} style={styles.image} />
          <TextBase>{item.name}</TextBase>
        </TouchableOpacity>
      )}
    />
  );
};

export default LanguageSelector;
