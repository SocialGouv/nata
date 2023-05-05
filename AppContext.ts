import React from 'react';

const AppContext = React.createContext({
  isOnboardingDone: false,
  setIsOnboardingDone: (isOnboardingDone: boolean) => {},
  displayInitialModal: false,
  setDisplayInitialModal: (displayInitialModal: boolean) => {},
  currentMonth: 1,
  setCurrentMonth: (currentMonth: number) => {},
});

export default AppContext;
