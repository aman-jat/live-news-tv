import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { Channel, channels } from '../data/channels';

interface GridScreenProps {
  onSelectChannel: (channel: Channel, index: number) => void;
}

const { width } = Dimensions.get('window');
const SPACING = 20;
const NUM_COLUMNS = 3;
const ITEM_WIDTH = (width - SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

export const GridScreen: React.FC<GridScreenProps> = ({ onSelectChannel }) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);

  const renderItem = ({ item, index }: { item: Channel; index: number }) => {
    const isFocused = focusedIndex === index;

    return (
      <TouchableHighlight
        style={[styles.channelCard, isFocused && styles.channelCardFocused]}
        underlayColor='#FFFFFF'
        activeOpacity={0.9}
        onFocus={() => setFocusedIndex(index)}
        onPress={() => onSelectChannel(item, index)}
        // Android TV focus styling
        hasTVPreferredFocus={index === 0} // highlight first item initially
      >
        <View style={[styles.cardContent, { backgroundColor: item.color }]}>
          <Text style={styles.channelName}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live News TV</Text>
      <FlatList
        data={channels}
        keyExtractor={item => item.id}
        numColumns={NUM_COLUMNS}
        renderItem={renderItem}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: SPACING,
  },
  title: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
    textAlign: 'center',
  },
  gridContainer: {
    paddingBottom: SPACING,
  },
  channelCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6, // Aspect ratio
    marginRight: SPACING,
    marginBottom: SPACING,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  channelCardFocused: {
    borderColor: '#FFFFFF',
    transform: [{ scale: 1.05 }],
    zIndex: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  channelName: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
