import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '~/constants';
import FormField from '~/components/FormField';
import CustomButton from '~/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser, getCurrentUser, signIn } from '~/lib/appwrite';
import { useGlobalContext } from '~/context/GlobalProvider';

const SignIn = () => {
  const {setUser, setisLoggedIn} = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setisSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const result = await getCurrentUser();

      setUser(result);
      setisLoggedIn(true);

      router.replace('/home');
      return result;
    } catch (error) {
      Alert.alert('Something went wrong...', error.message);
      return;
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="my-6 min-h-[80vh] w-full justify-center px-4">
          <Image source={images.logo} resizeMode="contain" className="h-[35px] w-[115px]" />
          <Text className="text-semibold font-psemibold mt-10 text-2xl text-white">
            Log In to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            showEyeIcon={true}
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles=""
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">Don't have an account?</Text>
            <Link className="font-psemibold text-secondary text-lg" href="/sign-up">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
