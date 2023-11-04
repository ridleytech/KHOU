import React, {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Header from './Header';
import {useSelector, RootStateOrAny} from 'react-redux';
import bgImg from '../images/stripe-bg.png';
import bgImgDark from '../images/stripe-bg-dark.png';
import SettingsItem from './SettingsItem';
import {useMemo} from 'react';

function Preferences() {
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ImageBackground
      style={styles.patternBG}
      source={theme === 'light' ? bgImg : bgImgDark}
      resizeMode="cover">
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Preferences</Text>

        <SettingsItem />
      </View>
    </ImageBackground>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    patternBG: {height: '100%'},
    header: {
      padding: 15,
      margin: 15,
      backgroundColor: theme === 'light' ? 'white' : '#222',
    },
    headerTxt: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      lineHeight: 30,
      color: theme === 'light' ? 'black' : 'white',
    },
  });

export default Preferences;
