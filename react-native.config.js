module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-matomo': {
      platforms: {
        ios: null, // this will disable autolinking for this package on iOS
      },
    },
  },
};
