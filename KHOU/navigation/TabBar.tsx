import React from 'react';

import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import homeIcon from '../images/home.png';
import weatherIcon from '../images/weather.png';
import watchIcon from '../images/watch.png';
import nearMeIcon from '../images/near-me.png';

import {useDispatch, useSelector} from 'react-redux';

function MyTabBar({navigation}) {
  const uiStyle = useSelector((state: RootStateOrAny) => state.prefs.uiStyle);
  const dispatch = useDispatch();

  const setPage = (page: any) => {
    dispatch({type: 'SET_CURRENT_PAGE', payload: page});
    navigation.navigate(page, {status: 'clearCall'});
  };

  return (
    <View
      style={[
        styles.tabContent,
        {backgroundColor: uiStyle == 1 ? '#333' : 'white'},
      ]}>
      <TouchableWithoutFeedback onPress={() => setPage('HomeFeed')}>
        <View style={[styles.icon]}>
          <FastImage source={homeIcon} style={styles.imgIcon} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View style={[styles.icon]}>
          <FastImage source={nearMeIcon} style={styles.imgIcon} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View style={[styles.icon]}>
          <FastImage source={weatherIcon} style={styles.imgIcon} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View style={[styles.icon]}>
          <FastImage source={watchIcon} style={styles.imgIcon} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 90,
    padding: 0,
    paddingBottom: 10,
  },
  imgIcon: {
    height: 55,
    width: 55,
  },
  icon: {
    height: 44,
    width: 44,
    // borderRadius: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyTabBar;
