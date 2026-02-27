import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  useTVEventHandler,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Channel, channels } from '../data/channels';

interface PlayerScreenProps {
  initialChannelIndex: number;
  onExit: () => void;
}

const { width, height } = Dimensions.get('window');

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
  initialChannelIndex,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialChannelIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const currentChannel = channels[currentIndex];

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      onExit();
      return true; // prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [onExit]);

  // Handle TV Remote (D-Pad Up/Down)
  useTVEventHandler(evt => {
    if (evt && evt.eventType === 'up') {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : channels.length - 1));
      setIsReady(false);
    } else if (evt && evt.eventType === 'down') {
      setCurrentIndex(prev => (prev < channels.length - 1 ? prev + 1 : 0));
      setIsReady(false);
    } else if (evt && evt.eventType === 'playPause') {
      setIsPlaying(prev => !prev);
    }
  });

  return (
    <View style={styles.container}>
      {!isReady && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#FF0000' />
        </View>
      )}
      <YoutubePlayer
        height={height}
        width={width}
        play={isPlaying}
        videoId={currentChannel.youtubeId}
        onReady={() => setIsReady(true)}
        initialPlayerParams={{
          controls: 0, // hide controls for a cleaner tv experience
          modestbranding: 1,
          rel: 0,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: '#000000',
  },
});
