import {
  GoogleAnalyticsSettings,
  GoogleAnalyticsTracker,
} from 'react-native-google-analytics-bridge';
import NavMap from './NavMap';
import gaConstants from './constants';

GoogleAnalyticsSettings.setDryRun(false);

GoogleAnalyticsSettings.setDispatchInterval(gaConstants.GA_TRACKER_INTERVAL);

const tracker = new GoogleAnalyticsTracker(gaConstants.GA_TRACKER_ID, {
  USER_ID: 1,
  APP_CODE: 2,
});

let customDimensions = {
  USER_ID: 'anonymous',
  APP_CODE: 'KHOU',
};

export const setDimension = dimension => {
  customDimensions = {...customDimensions, ...dimension};
};

// Google Analytics Tracker Methods

export const setUser = userId => {
  tracker.setUser(userId);
};

export const setAppName = appName => {
  tracker.setAppName(appName);
};

export const trackScreenView = screenName => {
  tracker.trackScreenView(screenName);
};

export const setAppVersion = appVersion => {
  tracker.setAppVersion(appVersion);
};

export const trackEvent = (category, action, optionalValues = {}) => {
  tracker.trackEventWithCustomDimensionValues(
    category,
    action,
    optionalValues,
    customDimensions,
  );
};

export const trackTiming = (category, value, optionalValues = {}) => {
  tracker.trackTiming(category, value, optionalValues);
};

export const setTrackUncaughtExceptions = (enabled = true) => {
  tracker.setTrackUncaughtExceptions(enabled);
};

/**
error: String, a description of the exception (up to 100 characters), accepts nil
fatal (required): Boolean, indicates whether the exception was fatal, defaults to false
*/
export const trackException = (error, fatal = false) => {
  tracker.trackException(error, fatal);
};

// Config for screen tracking
export const getScreenTrackingConfig = () => ({
  tracker,
  navStoreKey: 'nav',
  navActions: ['Navigation/NAVIGATE', 'Navigation/BACK', 'Navigation/RESET'],
  gaRouteMap,
  customDimensions,
});
