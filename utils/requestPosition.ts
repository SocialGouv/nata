import {Dispatch, SetStateAction} from 'react';
import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';

export const requestPosition = (
  setGeolocationGranted: Dispatch<SetStateAction<boolean | undefined>>,
) => {
  if (Platform.OS === 'ios') {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(status => {
      setGeolocationGranted(status === 'granted');
    });
  } else if (Platform.OS === 'android') {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(status => {
      setGeolocationGranted(status === 'granted');
    });
  } else {
    console.log('Géolocalisation non supportée');
  }
};
