import React, {
  View,
  Text,
  StyleSheet,
  Switch,
  ImageBackground,
} from 'react-native';
import Header from './Header';
import {useDispatch, useSelector} from 'react-redux';
import bgImg from '../images/stripe-bg.png';
import bgImgDark from '../images/stripe-bg-dark.png';

function Preferences() {
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const dispatch = useDispatch();

  return (
    <ImageBackground
      style={styles.patternBG}
      source={theme === 'light' ? bgImg : bgImgDark}
      resizeMode="cover">
      <Header />
      <View
        style={{
          padding: 15,
          backgroundColor: theme === 'light' ? 'white' : '#222',
        }}>
        <Text
          style={[
            styles.headerTxt,
            {color: theme === 'light' ? 'black' : 'white'},
          ]}>
          Preferences
        </Text>

        <View style={styles.settingsContainer}>
          <Text
            style={[
              styles.settingsLabel,
              {
                color: theme === 'light' ? '#495057' : 'white',
              },
            ]}>
            Dark mode
          </Text>
          <View style={styles.switchContainer}>
            <Switch
              style={{marginRight: 12}}
              trackColor={{
                false: 'white',
                true: theme === 'light' ? '#ADB5BD' : 'white',
              }}
              thumbColor={theme === 'light' ? 'white' : '#1360aa'}
              ios_backgroundColor="#ADB5BD"
              onValueChange={() => {
                dispatch({
                  type: 'CHANGE_UI',
                  theme: theme === 'light' ? 'dark' : 'light',
                });
              }}
              value={theme === 'light' ? false : true}
            />
            <Text
              style={[
                styles.modeSetting,
                {color: theme == 'light' ? 'black' : 'white'},
              ]}>
              {theme === 'dark' ? 'On' : 'Off'}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  patternBG: {height: '100%'},
  settingsContainer: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 100,
  },
  settingsLabel: {
    fontSize: 20,
    flex: 1,
    fontWeight: '400',
  },
  switchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeSetting: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
  },
  headerTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    lineHeight: 30,
  },
});

export default Preferences;
