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
      style={styles.feedBG}
      source={theme == 'light' ? bgImg : bgImgDark}
      resizeMode="cover">
      <Header />
      <View
        style={{
          padding: 15,
          backgroundColor: theme === 'light' ? 'white' : '#222',
        }}>
        <Text
          style={[
            styles.title,
            {color: theme === 'light' ? 'black' : 'white'},
          ]}>
          Preferences
        </Text>

        <View
          style={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 100,
          }}>
          <Text
            style={{
              color: theme === 'light' ? '#495057' : 'white',
              fontSize: 20,
              lineHeight: 30,
              flex: 1,
              fontWeight: '400',
            }}>
            Dark mode
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
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
              style={{
                color: theme == 'light' ? 'black' : 'white',
                fontSize: 16,
                lineHeight: 22,
                fontWeight: '400',
              }}>
              {theme === 'dark' ? 'On' : 'Off'}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  feedBG: {height: '100%'},

  feed: {
    padding: 0,
    margin: 0,
  },
  feedImg: {
    width: '100%',
    height: 150,
  },
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  fullArticleText: {
    fontSize: 15,
    backgroundColor: '#1360aa',
    padding: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {padding: 15, marginBottom: 20},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    lineHeight: 30,
  },
  subtitle: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 30,
  },
  contentText: {lineHeight: 22, fontSize: 16, marginTop: 30},
  readTime: {display: 'flex', flexDirection: 'row', marginBottom: 20},
});

export default Preferences;
