import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '~/components/EmptyState';
import InfoBox from '~/components/InfoBox';
import VideoCard from '~/components/VideoCard';
import { icons } from '~/constants';
import { useGlobalContext } from '~/context/GlobalProvider';

import { getUserPosts, signOut } from '~/lib/appwrite';
import useAppwrite from '~/lib/useAppwrite';

const Profile = () => {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    
    setUser(null);
    setisLoggedIn(false);

    router.replace('/sign-in');
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="mb-12 mt-6 w-full items-center justify-center px-4">
            <TouchableOpacity className="w-full items-end" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="h-6 w-6" />
            </TouchableOpacity>
            <View className="border-secondary h-16 w-16 items-center justify-center rounded-lg border">
              <Image
                source={{ uri: user?.avatar }}
                className="h-[90%] w-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox title={user?.username} containerStyles="mt-5" textStyles="text-lg" />
            <View className="mt-1 flex-row">
              <InfoBox title={posts.length || 0} subtitle='Posts' containerStyles="mr-10" textStyles="text-xl" />
              <InfoBox title={'1.2k'} subtitle="Followers" containerStyles="" textStyles="text-xl" />
            </View>
            <View className='mt-12 justify-center items-center'>
              <Text className='text-white text-xl font-psemibold'>Your videos</Text>
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

export default Profile;
