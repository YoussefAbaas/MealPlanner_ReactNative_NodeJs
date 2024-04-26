import axios from 'axios';
import moment from 'moment';
import React, {useContext, useRef} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {MenuContext} from '../contexts/MenuContext';

function CopySheet({sheetId, payload}) {
  const actionSheetRef = useRef(null);
  const {fetchAllMenuData} = useContext(MenuContext);

  const nextDate = moment(payload?.date, 'ddd DD')
    .add(1, 'days')
    .format('ddd DD');

  const copyItems = async () => {
    const response = await axios.post('http://192.168.1.5:3000/copyItems', {
      prevDate: payload?.date,
      nextDate: nextDate,
    });

    SheetManager.hide(sheetId);

    if (response.status === 200) {
      await fetchAllMenuData();
      Alert.alert('Success', 'Item copied');
    } else {
      Alert.alert('Error', 'Failed copy');
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
        <Text style={styles.title}>Copy or Move</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {payload?.date}-{nextDate}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={copyItems} style={styles.button}>
            <Text style={styles.buttonText}>Copy</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Move</Text>
          </Pressable>
        </View>
      </View>
    </ActionSheet>
  );
}

export default CopySheet;

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
  dateContainer: {
    backgroundColor: '#fd5c63',
    padding: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dateText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
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
