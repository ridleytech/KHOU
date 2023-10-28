import React, {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';

import FeedItem from './FeedItem';
import stripeBG from '../images/stripe-bg.png';
import Header from './Header';
import useFetch from './useFetch';

const {height} = Dimensions.get('window');

const local = 'http://localhost:3000/getStories';
const remote =
  'https://tppdgn71n8.execute-api.us-west-2.amazonaws.com/getStories';

function HomeFeed() {
  const {loading, error, value} = useFetch(remote, {}, []);

  return (
    <>
      <ImageBackground
        style={{height: '100%'}}
        source={stripeBG}
        resizeMode="cover">
        <Header />

        {loading ? (
          <View style={styles.loading}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Loading...</Text>
          </View>
        ) : value ? (
          <FlatList
            style={styles.feed}
            data={value.stories}
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
        ) : error ? (
          <View>
            <Text style={{fontSize: 22}}>error</Text>
          </View>
        ) : null}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  feed: {
    padding: 0,
    margin: 0,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeFeed;
