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
import serverURLS from '../utils/Constants';
import {useMemo} from 'react';

const {height} = Dimensions.get('window');

function HomeFeed() {
  const {loading, error, value} = useFetch(serverURLS.FEED_LOCAL, {}, []);
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <>
      <ImageBackground
        style={styles.patternBG}
        source={theme === 'light' ? bgImg : bgImgDark}
        resizeMode="cover">
        <Header />

        {loading ? (
          <View style={styles.loading}>
            <Text style={styles.loadingTxt}>Loading...</Text>
          </View>
        ) : value ? (
          <FlatList
            style={styles.feed}
            data={value.newsItems}
            renderItem={({item, index}) => (
              <FeedItem story={item} storyIndex={index} />
            )}
            keyExtractor={item => item.id}
            snapToAlignment="start"
            decelerationRate={'fast'}
            ListFooterComponent={<View style={{height: 150}} />}
            snapToInterval={height}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
          />
        ) : error ? (
          <View style={styles.loading}>
            <Text style={styles.errorTxt}>Please connect to the internet.</Text>
          </View>
        ) : null}
      </ImageBackground>
    </>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    patternBG: {height: '100%'},
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
    loadingTxt: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : '#222',
    },
    errorTxt: {fontSize: 22, color: theme === 'dark' ? 'white' : '#222'},
  });

export default HomeFeed;
