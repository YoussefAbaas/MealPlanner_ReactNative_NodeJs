import axios from 'axios';
import React, {useContext, useRef} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {MenuContext} from '../contexts/MenuContext';

function DeleteSheet({sheetId, payload}) {
  const actionSheetRef = useRef(null);
  const {fetchAllMenuData} = useContext(MenuContext);

  const deleteItem = async () => {
    const response = await axios.delete(
      `http://192.168.1.5:3000/deleteItems/${payload?.date}`,
    );
    if (response.status === 200) {
      SheetManager.hide(sheetId);
      await fetchAllMenuData();
      Alert.alert('Success', 'Item deleted');
    } else {
      Alert.alert('Error', 'Failed to delete');
    }
  };

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={styles.container}
      indicatorStyle={{width: 100}}
      gestureEnabled={true}>
      <View>
        <Text style={styles.title}>Delete Menu</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={deleteItem} style={styles.button}>
            <Text style={styles.buttonText}>Delete menu</Text>
          </Pressable>
        </View>
      </View>
    </ActionSheet>
  );
}

export default DeleteSheet;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 'auto',
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#DB0793',
    width: 100,
    padding: 10,
    borderRadius: 20,
    marginVertical: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
