import React, {ReactElement} from 'react';
import {GestureResponderEvent, Pressable} from 'react-native';

interface ButtonProps {
  children: ReactElement;
  style?: {};
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

const Button = ({children, style, onPress}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.5 : 1,
          ...style,
        },
      ]}>
      {children}
    </Pressable>
  );
};

export default Button;
