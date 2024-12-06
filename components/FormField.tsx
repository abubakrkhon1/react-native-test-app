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
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>
      <View
        className={`bg-black-100 ${isFocused ? 'border-secondary' : ''} border-black-200 h-16 w-full flex-row items-center rounded-2xl border-2 px-4`}>
        <TextInput
          className="font-psemibold flex-1 text-base text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && showEyeIcon && showPassword}
          autoCapitalize={title === 'Email' ? 'none' : 'sentences'}
          inputMode={title === 'Email' ? 'email' : 'text'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {title === 'Password' && showEyeIcon && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eyeHide : icons.eye}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
