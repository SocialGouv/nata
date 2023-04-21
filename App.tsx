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

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const [isOnboardingDone, setIsOnboardingDone] = React.useState<
    boolean | null
  >(null);

  const handleOnboardingDone = async () => {
    const value = await AsyncStorage.getItem('isOnboardingDone');
    if (value !== null && value === 'true') {
      setIsOnboardingDone(true);
    } else if (value !== null && value === 'false') {
      setIsOnboardingDone(false);
    }
  };

  useEffect(() => {
    handleOnboardingDone();
  }, []);

  return (
    <NavigationContainer>
      {!isOnboardingDone ? (
        //stack d'onboarding
        <Stack.Navigator
          initialRouteName="LanguageSelection"
          screenOptions={{
            headerShown: false,
          }}>
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
        </Stack.Navigator>
      ) : (
        //stack main app
        <Stack.Navigator
          initialRouteName="FollowUp"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="FollowUp" component={Navbar} />
          <Stack.Screen name="UrgencyPage" component={UrgencyPage} />
          <Stack.Screen name="ShareSituation" component={ShareSituation} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
