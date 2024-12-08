import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useVideoPlayer, VideoView } from 'expo-video';
import { icons } from '~/constants';
import { useEvent } from 'expo';

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item, activePlayer, setActivePlayer }: any) => {
  const link =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
  
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(link, (player) => {
    player.loop = false;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing }); // Use the player's playing state directly
  
  const handlePress = () => {
    // Pause the currently playing video if a new video is pressed
    if (activePlayer && activePlayer !== player) {
      activePlayer.pause();
    }

    // Play or pause the current video
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }

    // Set the current player as active
    setActivePlayer(player);
    setPlay(true);
  };

  return (
    <Animatable.View
      className="mr-3"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      <TouchableOpacity
        className="relative items-center justify-center"
        activeOpacity={0.7}
        onPress={handlePress}>
        {play ? (
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
          <>
            <ImageBackground
              source={{ uri: item.thumbnail }}
              className="my-5 h-72 w-52 overflow-hidden rounded-[35px] shadow-lg shadow-black/40"
              resizeMode="cover"
            />
            <Image source={icons.play} className="absolute h-12 w-12" resizeMode="contain" />
          </>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id || null);
  const [activePlayer, setActivePlayer] = useState<any>(null); // Track the active video player

  const viewableItemsChange = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
          activePlayer={activePlayer}
          setActivePlayer={setActivePlayer}
        />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      contentOffset={{ x: 150, y: 0 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;
