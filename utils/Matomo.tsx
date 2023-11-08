import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

export const MatomoTrackEvent = async (
  category: string,
  action: string,
  name?: string,
  value?: number,
  dimension1Value?: string,
) => {
  const tmpId = await DeviceInfo.getUniqueId();
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
  };

  const retrieveDimension = () => {
    return AsyncStorage.getItem('dimension');
  };

  const dimension1Id = '1';

  retrieveDimension().then(dimension1Value => {
    const url = `https://matomo.fabrique.social.gouv.fr/matomo.php?idsite=89&rec=1&url=https://nata.fabrique.social.gouv.fr/&_id=${tmpId}&e_a=${action}&e_c=${category}${
      dimension1Value !== null
        ? `&dimension${dimension1Id}=${encodeURIComponent(dimension1Value)}`
        : ''
    }${name ? `&e_n=${name}` : ''}${value ? `&e_v=${value}` : ''}`;
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => '' /* console.log(result) */)
      .catch(error => console.log('error', error));
  });
};
