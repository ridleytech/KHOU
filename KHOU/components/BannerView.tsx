import React, {StyleSheet, View} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';

function BannerView() {
  return (
    <View style={styles.bannerAd}>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId="ca-app-pub-5415127128968102/5758553162"
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          // console.error('Advert failed to load: ', error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerAd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BannerView;
