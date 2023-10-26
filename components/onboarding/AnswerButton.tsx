import React from 'react';
import {StyleSheet} from 'react-native';
import {Fonts} from '../../styles/Style';
import Button from '../ui/Button';
import TextBase from '../ui/TextBase';

interface AnswerButtonProps {
  answer: string;
  onClick: () => void;
  style?: object;
  smallerText?: boolean;
}
const AnswerButton = ({
  answer,
  onClick,
  style,
  smallerText,
}: AnswerButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#F5F5F5',
      borderRadius: 3,
      borderColor: '#D6D6D6',
      borderWidth: 1,
      padding: 10,
      paddingHorizontal: smallerText ? 20 : 30,
      marginHorizontal: 5,
    },
    text: {
      fontSize: smallerText ? 18 : 20,
      lineHeight: 30,
      fontWeight: '700',
      textAlign: 'center',
      fontFamily: Fonts.primary,
    },
  });

  return (
    <Button onPress={onClick} style={{...styles.button, ...style}}>
      <TextBase style={styles.text}>{answer}</TextBase>
    </Button>
  );
};

export default AnswerButton;
