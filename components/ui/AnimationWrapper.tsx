import React from 'react';
import Lottie, {AnimatedLottieViewProps} from 'lottie-react-native';

interface AnimationWrapperProps extends AnimatedLottieViewProps {
  children: React.ReactNode;
  setIsFinished?: () => void;
  showAnimation?: boolean;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  setIsFinished,
  children,
  showAnimation,
  ...lottieProps
}) => {
  if (!showAnimation) {
    return <>{children}</>;
  }

  return (
    <>
      <Lottie
        loop={false}
        onAnimationFinish={() => setIsFinished && setIsFinished()}
        autoPlay
        {...lottieProps}
      />
      {children}
    </>
  );
};

export default AnimationWrapper;
