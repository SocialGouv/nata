import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../../styles/Style';
import SliderItem from './SliderItem';

interface CustomCarouselProps {
  data: {
    label: string;
    value: string;
    redirectScreen?: boolean | undefined;
  }[];
  width: number;
  setPrengancyMonth: (index: number) => void;
}

export function CustomCarousel({
  data,
  width,
  setPrengancyMonth,
}: CustomCarouselProps) {
  const carouselRef = React.useRef<any>();
  const progressValue = useSharedValue<number>(0);
  return (
    <>
      {carouselRef.current?.getCurrentIndex() > 0 && (
        <Pressable
          onPress={() => {
            carouselRef.current?.prev();
          }}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              left: '5%',
              ...styles().arrowButton,
            },
          ]}>
          <FontAwesome5Icon
            name="chevron-left"
            size={15}
            color={Colors.black}
          />
        </Pressable>
      )}
      <Carousel
        ref={carouselRef}
        data={data}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 200,
        }}
        defaultIndex={0}
        renderItem={({item, index}) => (
          <SliderItem item={item} index={index + 1} />
        )}
        vertical={false}
        width={width}
        height={width * 0.65}
        loop={false}
        onSnapToItem={carouselIndex => setPrengancyMonth(carouselIndex + 1)}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
      />
      {!!progressValue && (
        <View style={styles().progressContainer}>
          {data.map((item, index) => {
            return (
              <PaginationItem
                animValue={progressValue}
                index={index}
                key={index}
                length={data.length}
              />
            );
          })}
        </View>
      )}
      {(carouselRef.current?.getCurrentIndex() < data.length - 1 ||
        !carouselRef.current) && (
        <Pressable
          onPress={() => {
            carouselRef.current?.next();
          }}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              right: '5%',
              ...styles().arrowButton,
            },
          ]}>
          <FontAwesome5Icon
            name="chevron-right"
            size={15}
            color={Colors.black}
          />
        </Pressable>
      )}
    </>
  );
}

const PaginationItem: React.FC<{
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
}> = props => {
  const {animValue, index, length} = props;
  const width = 5;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View style={styles(width).progressItem}>
      <Animated.View style={[styles().progressAnim, animStyle]} />
    </View>
  );
};

const styles = (width?: number) =>
  StyleSheet.create({
    arrowButton: {
      backgroundColor: Colors.white,
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      borderWidth: 1,
      borderColor: '#D6D6D6',
      position: 'absolute',
      top: '40%',
      transform: [{translateY: -50}],
      zIndex: 10,
    },
    carouselContainer: {
      paddingBottom: 15,
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 100,
      alignSelf: 'center',
    },
    progressItem: {
      backgroundColor: 'lightgrey',
      width: width,
      height: width,
      borderRadius: 50,
      overflow: 'hidden',
    },
    progressAnim: {
      borderRadius: 50,
      backgroundColor: 'black',
      flex: 1,
    },
  });
