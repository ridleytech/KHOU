import React, {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';

import FeedItem from './FeedItem';
import bgImg from '../images/stripe-bg.png';
import bgImgDark from '../images/stripe-bg-dark.png';
import Header from './Header';
import useFetch from './useFetch';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('window');

const local = 'http://localhost:3000/users/getNewsFeed';
const remote =
  'https://tppdgn71n8.execute-api.us-west-2.amazonaws.com/getNewsFeed';

function HomeFeed() {
  const {loading, error, value} = useFetch(remote, {}, []);
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);

  return (
    <>
      <ImageBackground
        style={styles.feedBG}
        source={theme == 'light' ? bgImg : bgImgDark}
        resizeMode="cover">
        <Header />

        {loading ? (
          <View style={styles.loading}>
            <Text style={styles.loadingTxt}>Loading...</Text>
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
            <View style={styles.loading}>
              <Text style={styles.errorTxt}>error</Text>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  feedBG: {height: '100%'},
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
  loadingTxt: {fontSize: 22, fontWeight: 'bold'},
  errorTxt: {fontSize: 22},
});

export default HomeFeed;
