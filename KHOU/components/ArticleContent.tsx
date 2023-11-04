import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, RootStateOrAny} from 'react-redux';
import BannerView from './BannerView';

function ArticleContent(props: any) {
  const story = props.story;
  const readTime: number = Math.ceil(
    (story.title.length + story.subtitle.length + story.content.length) / 200,
  );
  const theme = useSelector((state: RootStateOrAny) => state.prefs.theme);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.content}>
      <Text style={[styles.title]}>{story.title}</Text>
      <View style={styles.readTime}>
        <Text style={styles.readingTime}>Estimated read time: </Text>
        <Text style={styles.readingTimeTxt}>{readTime} minutes</Text>
      </View>

      <Text style={[styles.subtitle]}>{story.subtitle}</Text>
      <BannerView />
      <Text style={styles.contentText}>{story.content}</Text>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    content: {padding: 15, marginBottom: 20},
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      lineHeight: 30,
      color: theme === 'light' ? '#222' : 'white',
    },
    subtitle: {
      lineHeight: 22,
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 30,
      color: theme === 'light' ? '#222' : 'white',
    },
    readingTime: {
      fontSize: 16,
      color: theme === 'light' ? '#222' : 'white',
    },
    readingTimeTxt: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme === 'light' ? '#222' : 'white',
    },
    contentText: {
      lineHeight: 22,
      fontSize: 16,
      marginTop: 30,
      color: theme === 'light' ? '#222' : 'white',
    },
    readTime: {display: 'flex', flexDirection: 'row', marginBottom: 20},
  });

export default ArticleContent;
