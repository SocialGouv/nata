import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../styles/Style';
import {useTranslation} from 'react-i18next';

interface Props {
  displayModal: boolean;
  setDisplayModal: (value: boolean) => void;
}

const InformationModal = (props: Props) => {
  const {displayModal, setDisplayModal} = props;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={displayModal}
        onRequestClose={() => setDisplayModal(false)}>
        <View style={styles.innerContainer}>
          <View style={styles.blocContainer}>
            <View style={styles.topContainer}>
              <Image
                source={require('../../assets/images/onboarding/nurse.png')}
              />
              <Text style={styles.title}>{t('information_modal.title')}</Text>
            </View>
            <View style={styles.bottomContainer}>
              <Text style={styles.text}>{t('information_modal.content')}</Text>
              <Pressable
                style={styles.button}
                onPress={() => setDisplayModal(false)}>
                <Text
                  style={{...styles.text, color: 'white', fontWeight: '700'}}>
                  {t('onboarding.continue')}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InformationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  blocContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.backgroundPrimary,
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    marginHorizontal: 30,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    fontFamily: Fonts.primary,
  },
  bottomContainer: {
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: Fonts.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 3,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
