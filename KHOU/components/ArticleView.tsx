import React, {useEffect, useMemo} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Video from 'react-native-video';
import ArticleContent from './ArticleContent';

const {height} = Dimensions.get('window');

function ArticleView(props: any) {
  const story = props.route.params.story;
  const dispatch = useDispatch();
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'SET_CURRENT_PAGE', payload: 'story'});
    }, 250);
  }, []);

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
        <View key={story.id} style={[styles.container]}>
          <Video
            paused={true}
            controls={true}
            source={{uri: story.videourl, type: 'm3u8'}}
            style={styles.feedImg}
          />
          <ArticleContent props={props} story={story} />
          <TouchableOpacity onPress={() => viewFullArticle()}>
            <Text style={styles.fullArticleText}>View Full Article</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
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
      backgroundColor: theme == 'light' ? 'white' : '#222',
    },
    fullArticleText: {
      fontSize: 15,
      backgroundColor: '#1360aa',
      padding: 20,
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default ArticleView;
