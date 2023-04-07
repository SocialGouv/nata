import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MySituation from '../../views/Situation';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {Fonts} from '../../styles/Style';
import FollowUp from '../../views/FollowUp';

const Navbar = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.black,
        tabBarActiveBackgroundColor: Colors.white,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarItemStyle: {padding: 10},
        tabBarLabelStyle: {fontFamily: Fonts.primary},
        tabBarIconStyle: {marginBottom: 0, width: 20, height: 20},
        tabBarStyle: {
          height: 100,
          backgroundColor: Colors.background,
        },
      })}>
      <Tab.Screen
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color}) => (
            <FontAwesome name="clipboard-list" color={color} size={size} />
          ),
        }}
        name="Mon Suivi"
        component={FollowUp}
      />
      <Tab.Screen
        name="Ma situation"
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, color}) => (
            <FontAwesome name="user-circle" color={color} size={size} />
          ),
        }}
        component={MySituation}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
