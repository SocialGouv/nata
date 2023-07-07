import React from 'react';
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
import SoliguidePage from './views/SoliguidePage';
import {MatomoTrackEvent} from './utils/Matomo';
import VersionCheck from 'react-native-version-check';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Linking,
  Vibration,
  View,
} from 'react-native';
import Container from './components/ui/Container';
import {fetchContent} from './utils/fetchContent';

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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
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

  const [updateText, setUpdateText] = React.useState<Record<string, string>>();

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

  const getContentFromCache = React.useCallback(async () => {
    await AsyncStorage.getItem('content').then(content => {
      if (content !== null) {
        setUpdateText(JSON.parse(content)['force-update']);
      }
    });
    setIsLoading(false);
  }, []);

  const checkUpdateNeeded = () => {
    VersionCheck.needUpdate({country: 'fr'}).then(update => {
      if (update?.isNeeded) {
        Vibration.vibrate(200);
        Alert.alert(
          updateText?.title || 'Mise à jour',
          updateText?.description || 'Une mise à jour est disponible',
          [
            {
              text: updateText?.button || 'Mettre à jour',
              onPress: () => {
                fetchContent().finally(() => {
                  BackHandler.exitApp();
                  Linking.openURL(update.storeUrl);
                });
              },
            },
          ],
          {cancelable: false},
        );
      }
    });
  };

  React.useEffect(() => {
    checkUpdateNeeded();
  }, [getContentFromCache]);

  React.useEffect(() => {
    handleOnboardingDone();
  }, [isOnboardingDone]);

  React.useEffect(() => {
    getContentFromCache();
    MatomoTrackEvent('APP', 'APP_OPEN');
  }, [getContentFromCache]);

  return isLoading !== true ? (
    <>
      <AppContext.Provider value={contextValue}>
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName={
            //   isOnboardingDone ? 'FollowUp' : 'LanguageSelection'
            // }
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
                <Stack.Screen name="SoliguidePage" component={SoliguidePage} />
              </>
            ) : (
              //stack main app
              <>
                <Stack.Screen name="FollowUp" component={Navbar} />
                <Stack.Screen name="UrgencyPage" component={UrgencyPage} />
                <Stack.Screen name="SoliguidePage" component={SoliguidePage} />
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
  ) : (
    <Container>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    </Container>
  );
}

export default App;
