import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '~/components/EmptyState';
import SearchInput from '~/components/SearchInput';
import VideoCard from '~/components/VideoCard';

import { searchPosts } from '~/lib/appwrite';
import useAppwrite from '~/lib/useAppwrite';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="font-psemibold text-2xl text-white">{query}</Text>
            <View className="mb-8 mt-6">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="No videos found for this search!" />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
