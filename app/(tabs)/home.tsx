import React, { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '~/components/EmptyState';
import SearchInput from '~/components/SearchInput';
import Trending from '~/components/Trending';
import VideoCard from '~/components/VideoCard';

import { images } from '~/constants';
import { useGlobalContext } from '~/context/GlobalProvider';
import { getAllPosts, getLatestPosts } from '~/lib/appwrite';
import useAppwrite from '~/lib/useAppwrite';

const Home = () => {
  const { user, setUser, isLoggedIn } = useGlobalContext();
  const { data:posts, refetch, } = useAppwrite(getAllPosts);
  const { data:latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}/>}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6 px-4">
            <View className="mb-6 flex-row items-start justify-between">
              <View className="">
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back!</Text>
                <Text className="font-psemibold text-2xl text-white">{user?.username}</Text>
              </View>

              <View className="mt-1.5">
                <Image source={images.logoSmall} className="h-10 w-9" resizeMode="contain" />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pb-8 pt-5">
              <Text className="font-pregular mb-2 text-lg text-gray-100">Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subtitle="Be the first one to upload a video" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
