import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Episode} from '../models/interfaces';
import {colors} from '../theme/colors';

export function EpisodeItem({name, episode, air_date}: Episode) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {name} - {episode}
        </Text>
        <Text style={styles.status}>{air_date}</Text>
      </View>
    </View>
  );
}

//https://ethercreative.github.io/react-native-shadow-generator/
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 4,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  content: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: 16,
  },
  status: {
    fontSize: 16,
    color: colors.secondary,
  },
});
