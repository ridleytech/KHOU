import React, {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import khouLogo from '../images/khou-logo.webp';
import backIcon from '../images/back-icon.png';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, RootStateOrAny} from 'react-redux';

function Header() {
  const currentPage = useSelector((state: RootStateOrAny) => state.currentPage);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goBack = () => {
    dispatch({type: 'SET_CURRENT_PAGE', payload: 'HomeFeed'});
    navigation.navigate('HomeFeed');
  };

  return (
    <View style={styles.container}>
      <Image source={khouLogo} style={styles.img} />
      {currentPage !== 'HomeFeed' ? (
        <TouchableOpacity style={styles.backBtn} onPress={() => goBack()}>
          <Image source={backIcon} style={styles.backIcon} />
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
  backIcon: {width: 35, height: 35},
  container: {
    backgroundColor: '#1360aa',
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
