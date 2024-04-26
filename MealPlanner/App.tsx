/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import {SheetProvider} from 'react-native-actions-sheet';
import './src/sheets';
import {MenuProvider} from './src/contexts/MenuContext';

function App(): React.JSX.Element {
  return (
    <MenuProvider>
      <SheetProvider>
        <StackNavigator />
      </SheetProvider>
    </MenuProvider>
  );
}

export default App;
