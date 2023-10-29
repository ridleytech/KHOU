import React, {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';

import bgImg from '../images/stripe-bg.png';
import bgImgDark from '../images/stripe-bg-dark.png';
import Header from './Header';
import useFetch from './useFetch';
import {useSelector} from 'react-redux';

import WeatherItem from './WeatherItem';

const {height} = Dimensions.get('window');

const local = 'http://localhost:9999';

function WeatherFeed() {
  const {loading, error, value} = useFetch(local, {}, []);
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);

  return (
    <>
      <ImageBackground
        style={styles.patternBG}
        source={theme === 'light' ? bgImg : bgImgDark}
        resizeMode="cover">
        <Header />

        {loading ? (
          <View style={styles.loading}>
            <Text
              style={[
                styles.loadingTxt,
                {color: theme == 'dark' ? 'white' : '#222'},
              ]}>
              Loading...
            </Text>
          </View>
        ) : value && value.length ? (
          <View>
            <View
              style={{
                padding: 15,
                backgroundColor: theme == 'dark' ? '#222' : 'white',
                marginLeft: 15,
                marginRight: 15,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: theme == 'dark' ? 'white' : '#222',
                }}>
                10-Day Forecast
              </Text>
            </View>

            <FlatList
              style={styles.feed}
              data={value}
              renderItem={({item, index}) => (
                <WeatherItem weatherItem={item} storyIndex={index} />
              )}
              keyExtractor={item => item.id}
              snapToAlignment="start"
              decelerationRate={'fast'}
              onScrollToIndexFailed={() => {}}
              ListFooterComponent={<View style={{height: 150}} />}
              snapToInterval={height}
            />
          </View>
        ) : error ? (
          <View style={styles.loading}>
            <Text
              style={[
                styles.errorTxt,
                {color: theme == 'dark' ? 'white' : '#222'},
              ]}>
              Local NGROK server offine.
            </Text>
          </View>
        ) : null}
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
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
  loadingTxt: {fontSize: 22, fontWeight: 'bold'},
  errorTxt: {fontSize: 22},
});

export default WeatherFeed;
