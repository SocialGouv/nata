import {Image, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import {FlatGrid} from 'react-native-super-grid';
import languages from '../../assets/models/languages';
import {Colors} from '../../styles/Style';

interface Props {
  selectedLanguage: string | undefined;
  changeLanguage: (language: string) => void;
}

const LanguageSelector = (props: Props) => {
  const {selectedLanguage, changeLanguage} = props;
  const {width} = useWindowDimensions();
  const styles = StyleSheet.create({
    gridView: {
      flex: 1,
      width: '100%',
    },
    image: {
      width: 50,
      height: 50,
    },
  });

  return (
    <FlatGrid
      itemDimension={width / 9}
      data={languages}
      showsVerticalScrollIndicator={false}
      spacing={50}
      style={styles.gridView}
      renderItem={({item}) => (
        <Pressable
          onPress={() => changeLanguage(item.code)}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              width: item.code === selectedLanguage ? 65 : 55,
              height: item.code === selectedLanguage ? 65 : 55,
              borderWidth: item.code === selectedLanguage ? 3 : 0,
              borderColor:
                item.code === selectedLanguage ? Colors.primary : 'transparent',
              borderRadius: item.code === selectedLanguage ? 100 : 0,
            },
          ]}>
          <Image
            source={item.flag}
            style={[
              styles.image,
              {
                width: item.code === selectedLanguage ? 60 : 50,
                height: item.code === selectedLanguage ? 60 : 50,
              },
            ]}
          />
        </Pressable>
      )}
    />
  );
};

export default LanguageSelector;
