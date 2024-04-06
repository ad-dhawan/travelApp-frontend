import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import AppButton from './button';

import { SCREEN_WIDTH } from '../utils/values';
import { TEXT } from '../utils/colors';

const slidesData = [
    { id: 1, backgroundColor: '#FFE0E6', image: require('../assets/onboarding-travel.png'), text: 'Welcome to our Travel Companion App!', subtext: "Whether you\'re planning your dream vacation or just a weekend getaway, we\'ve got you covered." },
    { id: 2, backgroundColor: '#BFEFFF', image: require('../assets/onboarding-itinerary.png'), text: 'Effortlessly follow your itinerary', subtext: "With our intuitive interface, managing your schedule has never been easier." },
    { id: 3, backgroundColor: '#CFFFCF', image: require('../assets/onboarding-docs.png'), text: 'Keep all your documents in one place', subtext: "No more digging through emails or rummaging through bags – everything you need is right here." },
];
  

const OnboardingScreen = () => {
    const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.floor(
        Math.floor(event.nativeEvent.contentOffset.x) /
        Math.floor(event.nativeEvent.layoutMeasurement.width)
    );
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    if (currentIndex < slidesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slidesData}
        renderItem={({ item }) => <Slide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScrollToIndexFailed={() => {}}
        onMomentumScrollEnd={handleScroll}
        initialScrollIndex={currentIndex}
      />
      <View style={styles.buttonsContainer}>
        <AppButton text={'Prev'} onPress={goToPrevSlide} disabled={currentIndex === 0} />
        <AppButton text={'Next'} onPress={goToNextSlide} disabled={currentIndex === slidesData.length - 1} />
      </View>
      <View style={styles.createTripButtonContainer}>
        <AppButton text={'Create your first trip'} onPress={() => {}} customStyle={{ marginBottom: 20 }} />
      </View>
    </View>
  );
};

const Slide = ({ item }) => {
  return (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.text, {fontWeight: 'bold', fontSize: 18, marginBottom: 5}]}>{item.text}</Text>
      <Text style={styles.text}>{item.subtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: TEXT,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  createTripButtonContainer: {
    position: 'absolute',
    bottom: 80, // Adjust this value as needed
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default OnboardingScreen;
