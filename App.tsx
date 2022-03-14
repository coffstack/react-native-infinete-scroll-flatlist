import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  function renderItem({item}: ListRenderItemInfo<Episode>) {
    return <EpisodeItem {...item} />;
  }

  async function getCharacters() {
    // remova o comentário do setTimeout para perceber o loading com o delay
    // setTimeout(async () => {
    if (!hasMoreData) return;

    const {data} = await axios.get<Info<Episode[]>>(
      `https://rickandmortyapi.com/api/episode?page=${page}`,
    );

    if (data.results) {
      const current = data.results;
      setList(prev => [...prev, ...current]);

      if (data.info?.next) {
        setPage(prev => prev + 1);
      } else {
        setHasMoreData(false);
      }
    }
    // }, 2000);
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
        onEndReached={getCharacters}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Loading loading={hasMoreData} />}
      />
    </View>
  );
}

function Loading({loading}: {loading: boolean}) {
  if (loading) {
    return <ActivityIndicator size={'large'} color={colors.primary} />;
  }

  return null;
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
