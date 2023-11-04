import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CacheImage from './CacheImage';
import {useSelector} from 'react-redux';
// import {HOME_FEED_SCREEN} from './analytics/eventsConstants';
// import {trackEvent} from './analytics/utils';

function WeatherItem({weatherItem}: any) {
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View key={weatherItem.id} style={styles.container}>
      {
        <View style={[styles.content]}>
          <View style={styles.dayContainer}>
            <Text style={styles.day}>{weatherItem.day}</Text>
            <Text style={styles.date}>{weatherItem.date}</Text>
          </View>
          <CacheImage
            uri={weatherItem.condition}
            style={styles.feedImg}
            width={30}
            height={30}
            resize={'contain'}
          />
          <Text style={styles.highLow}>
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
            <Text style={styles.precipitations}>
              {weatherItem.precipitations}
            </Text>
          </View>
          <View style={styles.directionContainer}>
            <CacheImage
              uri={'https://www.khou.com/images/weather-10-day/wind.png'}
              style={styles.feedImg}
              width={25}
              height={25}
              resize={'cover'}
            />
            <Text style={styles.windNumber}>{weatherItem.windNumber}</Text>
            <Text style={[styles.windDirection]}>
              {weatherItem.windDirection}
            </Text>
          </View>
        </View>
      }
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingLeft: 15,
      paddingRight: 15,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme === 'light' ? 'white' : '#222',
    },
    date: {fontSize: 18, fontWeight: '500', color: 'white'},
    day: {fontSize: 18, fontWeight: 'bold', color: 'white'},
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
      color: theme === 'dark' ? 'white' : '#222',
    },
    windNumber: {
      marginLeft: 5,
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : '#222',
    },
    precipitations: {
      marginLeft: 5,
      marginRight: 20,
      fontSize: 16,
      fontWeight: 'bold',
      color: theme == 'dark' ? 'white' : '#222',
    },
    highLow: {
      marginLeft: 10,
      marginRight: 20,
      fontSize: 22,
      fontWeight: 'bold',
      color: theme === 'dark' ? 'white' : '#222',
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
    directionContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: 90,
    },
  });
export default WeatherItem;
