import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Colors, Fonts} from '../../styles/Style';
import {FlatGrid} from 'react-native-super-grid';
import Images from '../../assets/models/followupImages';
import {Image} from 'react-native';

interface Props {
  symptomes: {
    label: string;
    slug: string;
    status: string;
  }[];
}

const DisplaySymptomes = (props: Props) => {
  const {symptomes} = props;

  const {t} = useTranslation();

  const renderItem = ({
    item,
  }: {
    item: {label: string; slug: string; status: string};
  }) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={Images[item.slug as keyof typeof Images]}
          style={styles.image}
        />
        <Text style={styles.itemName}>{t(item.label)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('followup.symptomsTitle')}</Text>
      <FlatGrid
        itemDimension={120}
        data={symptomes}
        adjustGridToStyles={true}
        // contentContainerStyle={{height: 150}}
        horizontal={true}
        spacing={10}
        maxDimension={120}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => renderItem({item})}
      />
    </View>
  );
};

export default DisplaySymptomes;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: Fonts.primary,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
    lineHeight: 24,
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: Colors.backgroundPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 3,
    padding: 10,
    height: '100%',
    width: 120,
    justifyContent: 'flex-end',
  },
  itemName: {
    fontSize: 12,
    alignSelf: 'center',
    color: Colors.black,
    fontWeight: '600',
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    resizeMode: 'contain',
  },
});
