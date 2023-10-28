import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from './Header';
import {useDispatch} from 'react-redux';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

const {height} = Dimensions.get('window');

function StoryView(props: any) {
  const story = props.route.params.story;
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'SET_CURRENT_PAGE', payload: 'story'});
    }, 250);
  });

  return (
    <>
      <Header />
      <ScrollView>
        <View key={story.id} style={styles.container}>
          <Image
            source={{uri: story.image}}
            style={{width: '100%', height: 150}}
          />
          <View style={styles.content}>
            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.subtitle}>{story.subtitle}</Text>
            <BannerAd
              size={BannerAdSize.BANNER}
              unitId="ca-app-pub-5415127128968102/5758553162"
              onAdLoaded={() => {
                console.log('Advert loaded');
              }}
              onAdFailedToLoad={error => {
                console.error('Advert failed to load: ', error);
              }}
            />
            <Text style={styles.contentText}>{story.content}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  feed: {
    padding: 0,
    margin: 0,
  },
  container: {
    height: height,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  content: {padding: 15},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    lineHeight: 30,
  },
  subtitle: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 30,
  },
  contentText: {lineHeight: 22, fontSize: 16, fontWeight: 'semibold'},
});

export default StoryView;
