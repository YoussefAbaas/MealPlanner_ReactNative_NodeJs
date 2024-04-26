import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';

const StackNavigator = () => {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <stack.Screen
          options={{headerShown: false}}
          name="Menu"
          component={MenuScreen}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
