import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '~/components/FormField';
import { useVideoPlayer, VideoView } from 'expo-video';
import { icons } from '~/constants';
import CustomButton from '~/components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { createVideo } from '~/lib/appwrite';
import { useGlobalContext } from '~/context/GlobalProvider';

const Create = () => {
  const link =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: '',
    thumbnail: '',
    prompt: '',
  });

  const { user } = useGlobalContext();

  const player = useVideoPlayer(form.video, (player) => {
    player.loop = false;
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? 'images' : 'videos',
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video)
      return Alert.alert('Please fill in all the blanks!');
    setUploading(true);
    try {
      await createVideo({
        ...form, userId: user.$id,
      })

      Alert.alert("Post uploaded successfully!")
      router.push('/home');
    } catch (error) {
      Alert.alert("Error", error.message)

    } finally {
      setForm({
        title: '',
        video: '',
        thumbnail: '',
        prompt: '',
      });
      setUploading(false)
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="my-6 px-4">
        <Text className="font-psemibold text-2xl text-white">Upload a video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give you video a catchy title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium mb-2 text-base text-gray-100">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <VideoView
                player={player}
                allowsFullscreen
                allowsPictureInPicture
                style={{
                  marginTop: 12,
                  height: 300,
                  width: 200,
                  borderRadius: 35,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
            ) : (
              <View className="bg-black-100 h-40 w-full items-center justify-center rounded-2xl px-4">
                <View className="border-secondary-100 h-14 w-14 items-center justify-center border border-dashed">
                  <Image source={icons.upload} resizeMode="contain" className="h-1/2 w-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium mb-2 text-base text-gray-100">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="h-64 w-full rounded-2xl"
              />
            ) : (
              <View className="bg-black-100 border-black-200 h-16 w-full flex-row items-center justify-center space-x-2 rounded-2xl border-2 px-4">
                <Image source={icons.upload} resizeMode="contain" className="mr-1 h-5 w-5" />
                <Text className="font-pmedium text-sm text-gray-100">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to generate this video "
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
