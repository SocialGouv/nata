import DeviceInfo from 'react-native-device-info';

export const MatomoTrackEvent = async (
  category: string,
  action: string,
  name?: string,
  value?: number,
) => {
  const tmpId = await DeviceInfo.getUniqueId();
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
  };

  const url = `https://matomo.fabrique.social.gouv.fr/matomo.php?idsite=89&rec=1&url=https://nata.fabrique.social.gouv.fr/&_id=${tmpId}&e_a=${action}&e_c=${category}${
    name ? `&e_n=${name}` : ''
  }${value ? `&e_v=${value}` : ''}`;

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};
