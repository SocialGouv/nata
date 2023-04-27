import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors, Fonts} from '../../styles/Style';
import {useTranslation} from 'react-i18next';
import AppContext from '../../AppContext';
import TextBase from '../ui/TextBase';

const InformationModal = () => {
  const {displayInitialModal, setDisplayInitialModal} = useContext(AppContext);

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={displayInitialModal}
        onRequestClose={() => setDisplayInitialModal(false)}>
        <View style={styles.innerContainer}>
          <View style={styles.blocContainer}>
            <View style={styles.topContainer}>
              <Image
                source={require('../../assets/images/onboarding/nurse.png')}
              />
              <TextBase style={styles.title}>
                {t('information_modal.title')}
              </TextBase>
            </View>
            <View style={styles.bottomContainer}>
              <TextBase style={styles.text}>
                {t('information_modal.content')}
              </TextBase>
              <Pressable
                style={styles.button}
                onPress={() => setDisplayInitialModal(false)}>
                <TextBase
                  style={{...styles.text, color: 'white', fontWeight: '700'}}>
                  {t('onboarding.continue')}
                </TextBase>
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
