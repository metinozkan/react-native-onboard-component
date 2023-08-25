import React, { useRef, useState, type ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { ViewStyle, ImageStyle, TextStyle, StyleProp } from 'react-native';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

interface SlideData {
  image: ImageSourcePropType;
  title?: string;
  description?: string;
}

interface OnboardingSwiperProps {
  data: SlideData[];
  deactiveColor?: string;
  activeColor?: string;
  onDone?: () => void; // onDone prop
  nextLabel?: string | ReactNode; // nextLabel prop
  doneLabel?: string | ReactNode; // doneLabel prop
  bottomContainerStyle?: StyleProp<ViewStyle>; // bottomContainerStyle prop
  buttonColor?: string;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const OnboardingSwiper: React.FC<OnboardingSwiperProps> = ({
  data,
  deactiveColor = '#e8f1fe',
  activeColor = '#2871e3',
  onDone, // Updated callback name
  nextLabel = 'Next', // Default value for nextLabel
  doneLabel = 'Done', // Default value for doneLabel
  bottomContainerStyle,
  buttonColor = '#2871e3',
  descriptionStyle,
  titleStyle,
  textContainerStyle,
  imageStyle,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const width = Dimensions.get('window').width;
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveIndex(Math.round(index));
  };

  const handleButtonPress = () => {
    if (activeIndex === data.length - 1) {
      onDone && onDone(); // Call onDone if provided
    } else {
      scrollRef.current?.scrollTo({
        x: (activeIndex + 1) * width,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.slideContainer}>
            <Image source={item.image} style={[styles.image, imageStyle]} />
            <View style={[styles.textContainer, textContainerStyle]}>
              <Text style={[styles.title, titleStyle]}>{item.title}</Text>
              <Text style={[styles.description, descriptionStyle]}>
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.bottomContainer, bottomContainerStyle]}>
        <View style={styles.dotContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    activeIndex === index ? activeColor : deactiveColor,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.finishButton]}
          onPress={handleButtonPress}
        >
          <Text style={[styles.finishButtonText, { color: buttonColor }]}>
            {activeIndex === data.length - 1 ? doneLabel : nextLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  slideContainer: { width: Dimensions.get('window').width, height: '100%' },
  image: { width: '100%', height: '100%', position: 'absolute' },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 120,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  finishButton: {
    position: 'absolute',
    right: 20,
    bottom: -5,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 18,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default OnboardingSwiper;
