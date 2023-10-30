import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CacheImage from './CacheImage';
import {useSelector} from 'react-redux';
// import {HOME_FEED_SCREEN} from './analytics/eventsConstants';
// import {trackEvent} from './analytics/utils';

function WeatherItem({weatherItem}: any) {
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);

  return (
    <View key={weatherItem.id} style={styles.container}>
      {
        <View
          style={[
            styles.content,
            {
              backgroundColor: theme == 'light' ? 'white' : '#222',
            },
          ]}>
          <View style={styles.dayContainer}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              {weatherItem.day}
            </Text>
            <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
              {weatherItem.date}
            </Text>
          </View>

          <CacheImage
            uri={weatherItem.condition}
            style={styles.feedImg}
            width={30}
            height={30}
            resize={'contain'}
          />
          <Text
            style={[
              styles.highLow,
              {
                color: theme == 'dark' ? 'white' : '#222',
              },
            ]}>
            {weatherItem.high}/{weatherItem.low}
          </Text>

          <View style={styles.rainContainer}>
            <CacheImage
              uri={'https://www.khou.com/images/weather-10-day/rain.png'}
              style={styles.feedImg}
              width={25}
              height={25}
              resize={'contain'}
            />
            <Text
              style={[
                styles.precipitations,
                {
                  color: theme == 'dark' ? 'white' : '#222',
                },
              ]}>
              {weatherItem.precipitations}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 90,
            }}>
            <CacheImage
              uri={'https://www.khou.com/images/weather-10-day/wind.png'}
              style={styles.feedImg}
              width={25}
              height={25}
              resize={'cover'}
            />
            <Text
              style={{
                color: theme == 'dark' ? 'white' : '#222',
              }}>
              {weatherItem.windNumber}
            </Text>
            <Text
              style={[
                styles.windDirection,
                {
                  color: theme == 'dark' ? 'white' : '#222',
                },
              ]}>
              {weatherItem.windDirection}
            </Text>
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  feedImg: {
    width: 30,
    height: 30,
    aspectRatio: 'fit',
    marginRight: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    lineHeight: 30,
  },
  windDirection: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  windNumber: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  precipitations: {
    marginLeft: 5,
    marginRight: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  highLow: {
    marginLeft: 10,
    marginRight: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  dayContainer: {
    display: 'flex',
    marginRight: 15,
    backgroundColor: 'orange',
    padding: 10,
    paddingLeft: 8,
    width: 70,
  },
  rainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 80,
  },
});

export default WeatherItem;
