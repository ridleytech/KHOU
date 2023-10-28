import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './TabBar';
import HomeFeed from '../components/HomeFeed';
import StoryView from '../components/StoryView';

const AppTab = createBottomTabNavigator();
const AppTabScreen = () => {
  return (
    <AppTab.Navigator
      initialRouteName="HomeFeed"
      tabBar={(props: any) => <MyTabBar {...props} />}>
      <AppTab.Screen name="RootStackScreen" component={RootStackScreen} />
    </AppTab.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="HomeFeed" component={HomeFeed} />
    <RootStack.Screen name="StoryView" component={StoryView} />
  </RootStack.Navigator>
);

const Navigation = (props: any) => {
  return (
    <NavigationContainer>
      <AppTabScreen props={props} />
    </NavigationContainer>
  );
};

export default Navigation;
