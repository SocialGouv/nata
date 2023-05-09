import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../../styles/Style';
import SliderItem from './SliderItem';
export function CustomCarousel({data, width, setPrengancyMonth}) {
  const carouselRef = React.useRef(null);
  return (
    <>
      {carouselRef.current?.currentIndex > 0 && (
        <Pressable
          onPress={() => {
            carouselRef.current?.snapToPrev();
          }}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              left: '5%',
              ...styles.arrowButton,
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
        layout={'default'}
        layoutCardOffset={50}
        firstItem={0}
        renderItem={({item, index}) => (
          <SliderItem item={item} index={index + 1} />
        )}
        sliderWidth={width - 40}
        itemWidth={width * 0.5}
        showsHorizontalScrollIndicator={true}
        onSnapToItem={carouselIndex => setPrengancyMonth(carouselIndex + 1)}
      />
      {(carouselRef.current?.currentIndex < data.length - 1 ||
        !carouselRef.current) && (
        <Pressable
          onPress={() => {
            carouselRef.current?.snapToNext();
          }}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              right: '5%',
              ...styles.arrowButton,
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

const styles = StyleSheet.create({
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
});
