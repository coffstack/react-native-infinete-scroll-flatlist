import React from 'react';
import {useWindowDimensions, ImageBackground, StyleSheet} from 'react-native';

const cover = require('../assets/header.jpeg');
const dimensions = {
  with: 1200,
  height: 700,
};

const ratio = dimensions.height / dimensions.with;

export function FixedHeader() {
  const window = useWindowDimensions();

  const width = window.width;
  const height = width * ratio;

  return (
    <ImageBackground
      imageStyle={styles.image}
      style={[{width, height}, styles.container]}
      source={cover}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 24,
  },
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
