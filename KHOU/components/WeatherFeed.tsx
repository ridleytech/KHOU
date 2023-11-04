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
import serverURLS from '../utils/Constants';
import {useMemo} from 'react';

const {height} = Dimensions.get('window');

function WeatherFeed() {
  const {loading, error, value} = useFetch(serverURLS.WEATHER_NGROK, {}, []);
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
        ) : value && value.length ? (
          <View>
            <View style={styles.headerView}>
              <Text style={styles.headerTxt}>10-Day Forecast</Text>
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
              ListFooterComponent={<View style={{height: 200}} />}
              snapToInterval={height}
              alwaysBounceHorizontal={false}
              alwaysBounceVertical={false}
              bounces={false}
            />
          </View>
        ) : error ? (
          <View style={styles.loading}>
            <Text style={styles.errorTxt}>NGROK server offine.</Text>
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
    headerView: {
      padding: 15,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 15,
      backgroundColor: theme === 'dark' ? '#222' : 'white',
    },
    headerTxt: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : '#222',
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

export default WeatherFeed;
