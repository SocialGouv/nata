import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../styles/Style';
import Button from '../ui/Button';
import TextBase from '../ui/TextBase';

interface AnswerButtonProps {
  answer: string;
  onClick: () => void;
  style?: object;
  smallerText?: boolean;
  variant?: 'primary' | 'simple';
}
const AnswerButton = ({
  answer,
  onClick,
  style,
  smallerText,
  variant = 'simple',
}: AnswerButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: variant === 'primary' ? Colors.btnBackground : '#F5F5F5',
      borderRadius: 20,
      borderColor: variant === 'primary' ? Colors.primary : '#D6D6D6',
      borderWidth: 2,
      padding: 10,
      paddingHorizontal: smallerText ? 20 : 30,
      marginHorizontal: 5,
    },
    text: {
      fontSize: smallerText ? 18 : 20,
      lineHeight: 30,
      fontWeight: '700',
      textAlign: 'center',
      color: variant === 'primary' ? Colors.primary : Colors.black,
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
