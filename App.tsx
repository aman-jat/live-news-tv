import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GridScreen } from './src/screens/GridScreen';
import { PlayerScreen } from './src/screens/PlayerScreen';
import { Channel } from './src/data/channels';

export default function App() {
  const [activeChannelIndex, setActiveChannelIndex] = useState<number | null>(
    null,
  );

  const handleSelectChannel = (channel: Channel, index: number) => {
    setActiveChannelIndex(index);
  };

  const handleExitPlayer = () => {
    setActiveChannelIndex(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {activeChannelIndex === null ? (
        <GridScreen onSelectChannel={handleSelectChannel} />
      ) : (
        <PlayerScreen
          initialChannelIndex={activeChannelIndex}
          onExit={handleExitPlayer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
