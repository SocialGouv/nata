import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchContent = async (locale?: string) => {
  const BASE_URL = 'https://nata-bo.numericite.eu';
  //'http://localhost:1337';

  const url = locale
    ? BASE_URL + '/api/app-content?locale=' + locale
    : BASE_URL + '/api/app-content';

  const reqOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (locale !== 'fr') {
    fetch(BASE_URL + '/api/app-content', reqOptions)
      .then(res => res.json())
      .then(async data => {
        AsyncStorage.removeItem('frenchContent');
        await AsyncStorage.setItem('frenchContent', JSON.stringify(data));
      });
  }

  return fetch(url, reqOptions)
    .then(res => res.json())
    .then(async data => {
      AsyncStorage.removeItem('content');
      await AsyncStorage.setItem('content', JSON.stringify(data));
    })
    .catch(err => console.log(err));
};
