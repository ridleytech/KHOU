import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CacheImage from './CacheImage';
import BannerView from './BannerView';
import {useSelector} from 'react-redux';
// import {HOME_FEED_SCREEN} from './analytics/eventsConstants';
// import {trackEvent} from './analytics/utils';

function FeedItem({story, storyIndex}: any) {
  const navigation = useNavigation();
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  const viewStory = (selectedStory: any) => {
    // trackEvent(
    //   HOME_FEED_SCREEN.eventCategory,
    //   HOME_FEED_SCREEN.events.NAVIGATE,
    // );

    navigation.navigate('ArticleView', {story: selectedStory});
  };

  return (
    <View key={story.id} style={styles.container}>
      {
        //every 4th item in the news feed shows an Ad

        storyIndex === 0 || storyIndex % 3 !== 0 ? (
          <TouchableOpacity onPress={() => viewStory(story)}>
            <View style={styles.content}>
              <CacheImage
                uri={story.image}
                style={styles.feedImg}
                width={'100%'}
                height={150}
                resize={'cover'}
              />
              <View style={styles.padding}>
                <Text style={styles.title}>{story.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <BannerView />
        )
      }
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: 15,
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? 'white' : '#222',
    },
    feedImg: {
      width: '100%',
      height: 150,
    },
    padding: {paddingLeft: 10, paddingRight: 10},
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 30,
      marginTop: 20,
      lineHeight: 30,
      color: theme === 'light' ? 'black' : 'white',
    },
  });

export default FeedItem;
