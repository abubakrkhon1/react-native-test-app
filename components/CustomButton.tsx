import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles: string;
}

const CustomButton = ({ title, handlePress, containerStyles }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary min-h-[62px] items-center justify-center rounded-xl ${containerStyles}`}>
      <Text className="text-primary font-psemibold text-lg">CUstomButton</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
