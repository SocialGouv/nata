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

type ContextType = {
  isOnboardingDone: boolean;
  setIsOnboardingDone: React.Dispatch<React.SetStateAction<boolean>>;
  displayInitialModal: boolean;
  setDisplayInitialModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
};

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [isOnboardingDone, setIsOnboardingDone] =
    React.useState<boolean>(false);
  const [displayInitialModal, setDisplayInitialModal] =
    React.useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = React.useState<number>(1);

  const contextValue: ContextType = {
    isOnboardingDone,
    setIsOnboardingDone,
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

  return (
    <AppContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isOnboardingDone ? 'FollowUp' : 'LanguageSelection'}
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
              <Stack.Screen name="ShareSituation" component={ShareSituation} />
              <Stack.Screen name="HelpAround" component={HelpPage} />
              <Stack.Screen name="Legal" component={Legal} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;
