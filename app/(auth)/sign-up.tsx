import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '~/constants';
import FormField from '~/components/FormField';
import CustomButton from '~/components/CustomButton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert('Error1', 'Please fill in all the fields');
    }

    setisSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      if (result) router.replace('/home');
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
            Sign Up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType=""
            placeholder=""
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder=""
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder=""
            keyboardType=""
            showEyeIcon={false}
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles=""
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">Already have an account?</Text>
            <Link className="font-psemibold text-secondary text-lg" href="/sign-in">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
