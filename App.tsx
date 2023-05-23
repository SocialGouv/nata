import React, {useEffect} from 'react';
import './assets/i18n/i18n';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navbar from './components/ui/Navbar';
import OnboardingEndPath from './views/OnboardingSubScreens/OnboardingEndPath';
import Onboarding from './views/OnBoarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelection from './views/LanguageSelection';
import UrgencyPage from './views/UrgencyPage';
import ShareSituation from './views/ShareSituation';
import AppContext from './AppContext';
import HelpPage from './views/HelpPage';
import ShortOnboardingEnd from './views/OnboardingSubScreens/ShortOnboardingEnd';
import Legal from './views/Legal';
import DeviceInfo from 'react-native-device-info';
/*import MatomoTracker, {
  MatomoProvider,
  useMatomo,
} from 'matomo-tracker-react-native';
import Matomo from 'react-native-matomo';*/

type ContextType = {
  isOnboardingDone: boolean;
  isEmergencyOnBoardingDone: boolean;
  setIsOnboardingDone: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmergencyOnBoardingDone: React.Dispatch<React.SetStateAction<boolean>>;
  displayInitialModal: boolean;
  setDisplayInitialModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
};

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [isOnboardingDone, setIsOnboardingDone] =
    React.useState<boolean>(false);
  const [isEmergencyOnBoardingDone, setIsEmergencyOnBoardingDone] =
    React.useState<boolean>(false);
  const [displayInitialModal, setDisplayInitialModal] =
    React.useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = React.useState<number>(1);
  const [userId, setUserId] = React.useState<string>('');
  //const [matomoIstance, setMatomoInstance] = React.useState<MatomoTracker>();
  //const {trackAppStart} = useMatomo();

  const contextValue: ContextType = {
    isOnboardingDone,
    isEmergencyOnBoardingDone,
    setIsOnboardingDone,
    setIsEmergencyOnBoardingDone,
    displayInitialModal,
    setDisplayInitialModal,
    currentMonth,
    setCurrentMonth,
  };

  const handleOnboardingDone = async () => {
    try {
      const value = await AsyncStorage.getItem('isOnboardingDone');
      if (value !== null && value === 'true') {
        setIsOnboardingDone(true);
      } else if (value !== null && value === 'false') {
        setIsOnboardingDone(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleOnboardingDone();
  }, [isOnboardingDone]);

  useEffect(() => {
    console.log('userId : ', userId);
    console.log('env : ', process.env.REACT_APP_MATOMO_SITE_URL);
  }, [userId]);

  const getUserId = async () => {
    const tmpId = await DeviceInfo.getUniqueId();
    setUserId(tmpId);
    /*setMatomoInstance(
      new MatomoTracker({
        urlBase: process.env.REACT_APP_MATOMO_SITE_URL ?? '', // required
        trackerUrl: process.env.REACT_APP_MATOMO_SITE_URL + 'piwik.php' ?? '', // optional, default value: `${urlBase}matomo.php`
        siteId: parseInt(process.env.REACT_APP_MATOMO_SITE_ID ?? 'O', 10), // required, number matching your Matomo project
        userId: tmpId,
        log: true,
      }),
    );
    Matomo.initTracker(
      process.env.REACT_APP_MATOMO_SITE_URL + 'piwik.php',
      parseInt(process.env.REACT_APP_MATOMO_SITE_ID ?? 'O', 10),
    );
    Matomo.setUserId(tmpId);
    let appStart = await trackAppStart({});
    console.log('appstart : ', appStart);*/
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={
              isOnboardingDone ? 'FollowUp' : 'LanguageSelection'
            }
            screenOptions={{
              headerShown: false,
            }}>
            {isOnboardingDone === false ? (
              //stack d'onboarding
              <>
                <Stack.Screen
                  name="LanguageSelection"
                  component={LanguageSelection}
                />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="FollowUp" component={Navbar} />
                <Stack.Screen
                  name="OnboardingEndPath"
                  component={OnboardingEndPath}
                />
                <Stack.Screen
                  name="ShortOnboardingEnd"
                  component={ShortOnboardingEnd}
                />
              </>
            ) : (
              //stack main app
              <>
                <Stack.Screen name="FollowUp" component={Navbar} />
                <Stack.Screen name="UrgencyPage" component={UrgencyPage} />
                <Stack.Screen
                  name="ShareSituation"
                  component={ShareSituation}
                />
                <Stack.Screen name="HelpAround" component={HelpPage} />
                <Stack.Screen name="Legal" component={Legal} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
}

export default App;
