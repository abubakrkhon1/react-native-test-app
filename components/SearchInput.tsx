import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from '~/constants';

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: any) => void;
  otherStyles?: string;
  keyboardType?: string;
  showEyeIcon?: boolean;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  showEyeIcon,
  ...props
}: FormFieldProps) => {
  const [showPassword, setshowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`bg-black-100 ${isFocused ? 'border-secondary' : ''} border-black-200 h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 px-4`}>
      <TextInput
        className="font-pregular mt-0.5 flex-1 text-base text-white"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && showEyeIcon && showPassword}
        autoCapitalize={title === 'Email' ? 'none' : 'sentences'}
        inputMode={title === 'Email' ? 'email' : 'text'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default FormField;
