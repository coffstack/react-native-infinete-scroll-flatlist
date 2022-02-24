import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EpisodeItem} from './src/components/EpisodeItem';
import {Episode, Info} from './src/models/interfaces';
import axios from 'axios';
import {colors} from './src/theme/colors';
import {FixedHeader} from './src/components/FixedHeader';

export default function App() {
  const [list, setList] = useState<Episode[]>([]);
  function renderItem({item}: ListRenderItemInfo<Episode>) {
    return <EpisodeItem {...item} />;
  }

  async function getCharacters() {
    const {data} = await axios.get<Info<Episode[]>>(
      'https://rickandmortyapi.com/api/episode',
    );

    if (data.results) {
      setList(data.results);
    }
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <FixedHeader />
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>Rick and Morty</Text>}
        data={list}
        contentContainerStyle={{paddingBottom: 20}}
        keyExtractor={item => item.name}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.onBackground,
    marginVertical: 16,
  },
});
