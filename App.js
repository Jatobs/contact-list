import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/HomeScreens';
import ProfileScreen from './screens/ProfileScreens';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen  
});
export default createAppContainer(AppNavigator);