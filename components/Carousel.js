import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const { width: ITEM_WIDTH } = Dimensions.get('window');
const ITEM_HEIGHT = 220;

const Carousel = ({ data }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % data.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 6000);

    return () => clearInterval(scrollInterval);
  }, [currentIndex, data.length]);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItemContainer}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderCarouselItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      contentContainerStyle={styles.carouselContainer}
    />
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  carouselItemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginHorizontal: 0,
    padding: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default Carousel;

