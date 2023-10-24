import React from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface CustomModalProps {
  children: React.ReactNode;
  visible: boolean;
  borderColor?: string;
  backgroundColor?: string;
  onRequestClose: () => void;
  topPart?: boolean;
  customHeader?: boolean;
}

const CustomModal = ({children, ...props}: CustomModalProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      width: '80%',
    },
    view: {
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
      borderColor: props.borderColor ? props.borderColor : 'transparent',
      borderWidth: props.borderColor ? 3 : 0,
      maxHeight: '85%',
      borderRadius: 12,
      // paddingHorizontal: 15,
      // paddingVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 5,
    },
    topModal: {
      color: props.borderColor ? props.borderColor : 'initial',
      backgroundColor: props.borderColor ? props.borderColor : 'initial',
      height: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      zIndex: 10,
      top: 15,
    },
    modalHeader: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 15,
      paddingTop: 10,
    },
    closeIcon: {
      color: Colors.black,
    },
  });

  return (
    <Modal
      style={styles.container}
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.container} onTouchEnd={() => props.onRequestClose()}>
        <View
          style={styles.modal}
          onTouchEnd={e => {
            e.preventDefault();
            e.stopPropagation();
          }}>
          {props.topPart && <View style={styles.topModal} />}
          <View style={styles.view}>
            {!props.customHeader && (
              <View style={styles.modalHeader}>
                <Pressable onPress={() => props.onRequestClose()}>
                  <Icon
                    name="close-outline"
                    size={32}
                    style={styles.closeIcon}
                  />
                </Pressable>
              </View>
            )}

            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
