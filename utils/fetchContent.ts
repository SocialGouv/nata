import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchContent = async (locale?: string) => {
  const BASE_URL = 'http://localhost:1337';
  const url = locale
    ? BASE_URL + '/api/app-content?locale=' + locale
    : BASE_URL + '/api/app-content';
  console.log(url);
  const reqOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(url, reqOptions)
    .then(res => res.json())
    .then(async data => {
      console.log('Content fetched');
      AsyncStorage.removeItem('content');
      await AsyncStorage.setItem('content', JSON.stringify(data)).then(() =>
        console.log('Content stored'),
      );
    })
    .catch(err => console.log(err));
};
