import { View, Text } from 'react-native'
import React from 'react'

interface InfoBoxProps{
    title:string;
    subtitle:string;
    containerStyles:string;
    textStyles:string;
}

const InfoBox = ({title, subtitle, containerStyles, textStyles}:InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${textStyles}`}>{title}</Text>
      <Text className={`text-sm text-gray-100 text-center font-regular ${textStyles}`}>{subtitle}</Text>
    </View>
  )
}

export default InfoBox