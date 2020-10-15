import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Import screen auth
import Splashscreen from './src/screen/auth/splashscreen';
import Login from './src/screen/auth/login';
import Register from './src/screen/auth/register';

// import screen dashboard
import Home from './src/screen/dashboard/home'
import Todo1 from './src/screen/dashboard/todo1'
import Todo2 from './src/screen/dashboard/todo2'
import Todo3 from './src/screen/dashboard/todo3'
import Profile from './src/screen/dashboard/profile'

const Stack = createStackNavigator ();
const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Todo1" component={Todo1} />
      <Tab.Screen name="Todo2" component={Todo2} />
      <Tab.Screen name="Todo3" component={Todo3} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App () {
  return <NavigationContainer>
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  </NavigationContainer>;
}
