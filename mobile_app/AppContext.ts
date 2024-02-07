import React from 'react';

const AppContext = React.createContext({
  isOnboardingDone: false,
  isEmergencyOnBoardingDone: false,
  setIsOnboardingDone: (isOnboardingDone: boolean) => {},
  setIsEmergencyOnBoardingDone: (isEmergencyOnBoardingDone: boolean) => {},
  displayInitialModal: false,
  setDisplayInitialModal: (displayInitialModal: boolean) => {},
  currentMonth: 1,
  setCurrentMonth: (currentMonth: number) => {},
  needGeolocation: true,
  setNeedGeolocation: (needGeolocation: boolean) => {},
});

export default AppContext;
