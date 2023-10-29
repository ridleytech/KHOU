import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Header from './Header';
import {useDispatch} from 'react-redux';
import Video from 'react-native-video';
import BannerView from './BannerAd';

const {height} = Dimensions.get('window');

function StoryView(props: any) {
  const story = props.route.params.story;
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'SET_CURRENT_PAGE', payload: 'story'});
    }, 250);
  });

  const viewFullArticle = () => {
    let url = story.url;

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Can't open URI: " + url);
      }
    });
  };

  return (
    <>
      <Header />
      <ScrollView>
        <View key={story.id} style={styles.container}>
          <Video
            paused={true}
            controls={true}
            source={{uri: story.videourl, type: 'm3u8'}}
            style={styles.feedImg}
          />

          <View style={styles.content}>
            <Text style={styles.title}>{story.title}</Text>
            <Text style={styles.subtitle}>{story.subtitle}</Text>
            <BannerView />
            <Text style={styles.contentText}>{story.content}</Text>
          </View>

          <TouchableOpacity onPress={() => viewFullArticle()}>
            <Text style={styles.fullArticleText}>View Full Article</Text>
          </TouchableOpacity>
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
  feedImg: {
    width: '100%',
    height: 150,
  },
  container: {
    height: height,
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
    marginBottom: 30,
    marginTop: 20,
    lineHeight: 30,
  },
  subtitle: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  contentText: {lineHeight: 22, fontSize: 16, marginTop: 20},
});

export default StoryView;
