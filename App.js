//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//redux
import store from './store'
import { Provider } from 'react-redux'


const Stack = createNativeStackNavigator();


//Components 
import Home from './Home';
import Settings from './Settings';
import CurrencyList from './CurrencyList';

export default function App() {
  
 
 
  return (
    <Provider store={store}>
    <NavigationContainer>  
      <Stack.Navigator>
        <Stack.Screen name="Home"  component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CurrencyList" component={CurrencyList} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

