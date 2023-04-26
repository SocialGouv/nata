import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Fonts} from '../../styles/Style';
import Button from '../ui/Button';
import TextBase from '../ui/TextBase';

interface AnswerButtonProps {
  answer: string;
  onClick: () => void;
  style?: object;
}

const AnswerButton = ({answer, onClick, style}: AnswerButtonProps) => {
  const {t} = useTranslation();
  return (
    <Button onPress={onClick} style={{...styles.button, ...style}}>
      <TextBase style={styles.text}>{t(answer)}</TextBase>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 30,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: Fonts.primary,
  },
});

export default AnswerButton;
