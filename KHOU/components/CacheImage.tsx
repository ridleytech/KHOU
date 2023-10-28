import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import shorthash from 'shorthash';
import {downloadFile, exists} from 'react-native-fs';
var RNFS = require('react-native-fs');

export default CacheImage = props => {
  const uri = props.uri;
  const name = shorthash.unique(props.uri);
  const [source, setsource] = useState(null);
  const [error, seterror] = useState(null);

  useEffect(() => {
    initImage();
  });

  const initImage = async () => {
    var path = RNFS.CachesDirectoryPath + '/' + name;

    await exists(path).then(exists => {
      if (exists) {
        setsource({
          uri: path,
        });
      } else {
        getFile(path);
      }
    });
  };

  const getFile = (path: string) => {
    let downloadOptions = {
      fromUrl: uri,
      toFile: path,
    };
    downloadFile(downloadOptions)
      .promise.then(async () => {
        setsource({
          uri: path,
        });
      })
      .catch(e => {
        seterror(e);
      });
  };

  return <Image style={styles.feedImg} source={source} resizeMode="cover" />;
};

const styles = StyleSheet.create({
  feedImg: {
    width: '100%',
    height: 150,
  },
});
