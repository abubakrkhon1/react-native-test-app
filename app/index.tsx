import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import CustomButton from '~/components/CustomButton';
import { images } from '~/constants';

const RootLayout = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="min-h-[85vh] w-full items-center justify-center px-4">
          <Image source={images.logo} className="h-[84px] w-[130px]" resizeMode="contain" />
          <Image
            source={images.cards}
            className="h-[300px] w-full max-w-[380px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-center text-3xl font-bold text-white">
              Discover Endless Possibilities With{' '}
              <Text className="text-secondary text-center text-3xl font-bold">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="absolute -bottom-2 -right-8 h-[15px] w-[136px]"
              resizeMode="contain"
            />
          </View>
          <Text className="font-pregular mt-7 text-center text-sm text-gray-100">
            Where creativity meets innovation: embark on a journey of limitless exploration with
            Aora
          </Text>
          <CustomButton
            title="Continue with email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default RootLayout;
