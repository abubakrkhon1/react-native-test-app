import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from '~/constants';
import { router, usePathname } from 'expo-router';

const SearchInput = (initialQuery:any) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery.initialQuery);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`bg-black-100 ${isFocused ? 'border-secondary' : ''} border-black-200 h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 px-4`}>
      <TextInput
        className="font-pregular mt-0.5 flex-1 text-base text-white"
        placeholder="Search for a video topic"
        value={query}
        placeholderTextColor="#cdcde0"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert(
              'Missing query',
              'Please input something to search results across database'
            );
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
