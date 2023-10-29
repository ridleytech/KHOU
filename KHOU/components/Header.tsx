import React, {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import khouLogo from '../images/khou-logo.webp';
import backIcon from '../images/back-icon.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';
import prefsLight from '../images/prefs-light.png';

function Header() {
  const currentPage = useSelector((state: RootStateOrAny) => state.currentPage);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goBack = () => {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];

    dispatch({type: 'SET_CURRENT_PAGE', payload: prevRoute.name});
    navigation.goBack();
  };

  const goToPrefs = () => {
    dispatch({type: 'SET_CURRENT_PAGE', payload: 'Preferences'});
    navigation.navigate('Preferences');
  };

  return (
    <View style={styles.container}>
      <Image source={khouLogo} style={styles.img} />
      {currentPage !== 'HomeFeed' ? (
        <TouchableOpacity style={styles.backBtn} onPress={() => goBack()}>
          <Image source={backIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : null}

      {currentPage !== 'Preferences' ? (
        <TouchableOpacity style={styles.prefsBtn} onPress={() => goToPrefs()}>
          <Image source={prefsLight} style={styles.prefsIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 70,
    height: 70,
    marginTop: 40,
    aspectRatio: 'auto',
  },
  backBtn: {position: 'absolute', left: 20, top: 65},
  prefsBtn: {position: 'absolute', right: 20, top: 65},

  icon: {width: 35, height: 35},
  prefsIcon: {width: 30, height: 30},
  container: {
    backgroundColor: '#1360aa',
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
