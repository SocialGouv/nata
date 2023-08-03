import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface CustomModalProps {
  children: React.ReactNode;
  visible: boolean;
  borderColor?: string;
  onRequestClose: () => void;
  topPart?: boolean;
}

const CustomModal = ({children, ...props}: CustomModalProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      height: '100%',
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      height: 180,
      width: '80%',
    },
    view: {
      backgroundColor: 'white',
      borderColor: props.borderColor ? props.borderColor : 'transparent',
      borderWidth: props.borderColor ? 3 : 0,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      zIndex: 5,
      height: '100%',
    },
    topModal: {
      color: Colors.orange,
      backgroundColor: '#FF9E2A',
      height: 12,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      zIndex: 10,
      top: 15,
    },
  });

  return (
    <Modal
      style={styles.container}
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.topModal} />
          <View style={styles.view}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
