import React, { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, TriageWebScreen } from './screens';
import Icon from 'react-native-vector-icons/Ionicons';

const navigationRef = createRef<any>();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          }
          return <Icon name={iconName} color={color} size={25} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ headerBackTitleVisible: false }}
        initialRouteName="Home"
        headerMode="float"
      >
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TriageWebview"
          options={{ headerShown: false }}
          component={TriageWebScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
