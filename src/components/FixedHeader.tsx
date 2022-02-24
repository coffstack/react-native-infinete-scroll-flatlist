import React from 'react';
import {
  useWindowDimensions,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {colors} from '../theme/colors';

const cover = require('../assets/header.jpeg');
const dimensions = {
  with: 1200,
  height: 700,
};

const ratio = dimensions.height / dimensions.with;

export function FixedHeader({page}: {page?: number}) {
  const window = useWindowDimensions();

  const width = window.width;
  const height = width * ratio;

  return (
    <ImageBackground
      imageStyle={styles.image}
      style={[{width, height}, styles.container]}
      source={cover}>
      {page && (
        <View style={styles.counter}>
          <Text style={styles.text}>Página Atual: {page}</Text>
        </View>
      )}
    </ImageBackground>
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
  counter: {
    backgroundColor: colors.onBackground,
    padding: 12,
    alignSelf: 'center',

    marginBottom: 16,
  },

  text: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.background,
  },
});
