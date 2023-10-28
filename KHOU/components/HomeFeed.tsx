import {useEffect, useState} from 'react';
import React, {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import FeedItem from './FeedItem';
import stripeBG from '../images/stripe-bg.png';
import Header from './Header';

const {height} = Dimensions.get('window');

function HomeFeed() {
  const [storyList, setStoryList] = useState();

  useEffect(() => {
    getStories();
  }, []);

  const getStories = async () => {
    const stories = await fetch(
      'https://tppdgn71n8.execute-api.us-west-2.amazonaws.com/getStories',
    )
      .then(response => {
        return response.json();
      })
      .catch(error => console.log('error', error));

    setStoryList(stories.stories);
  };

  return (
    <>
      <ImageBackground source={stripeBG} resizeMode="cover">
        <Header />

        <FlatList
          style={styles.feed}
          data={storyList}
          renderItem={({item, index}) => (
            <FeedItem story={item} storyIndex={index} />
          )}
          keyExtractor={item => item.id}
          snapToAlignment="start"
          decelerationRate={'fast'}
          onScrollToIndexFailed={() => {}}
          ListFooterComponent={<View style={{height: 150}} />}
          snapToInterval={height}
        />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  feed: {
    padding: 0,
    margin: 0,
  },
});

export default HomeFeed;
