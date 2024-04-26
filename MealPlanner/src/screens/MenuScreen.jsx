/* eslint-disable react-hooks/exhaustive-deps */
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import DailyMealPlan from '../components/DailyMealPlan';
import ChoiceButton from '../components/ChoiceButton';
import {MenuContext} from '../contexts/MenuContext';

const MenuScreen = () => {
  const route = useRoute();
  const [item, setItem] = useState('');
  const [option, setOption] = useState('');
  const [type, setType] = useState('');
  const {menuData, fetchAllMenuData} = useContext(MenuContext);

  const navigation = useNavigation();

  const addDishToMenu = async () => {
    setItem('');
    const dish = {
      date: route?.params.date,
      name: item,
      type,
      mealType: option,
    };
    await axios.post('http://192.168.1.5:3000/menu/addDish', dish);
    fetchAllMenuData();
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text onPress={() => navigation.goBack()} style={styles.backButton}>
          Back
        </Text>
        <View style={{flex: 1}}>
          <Text style={styles.dateText}>{route?.params?.date}</Text>
        </View>
        <Text style={styles.deleteButton}>Delete</Text>
      </View>
      <View style={styles.mealTypeContainer}>
        {['Breadfast', 'Lunch', 'Dinner'].map(o => (
          <ChoiceButton
            title={o}
            selectedOption={option}
            setSelectedOption={setOption}
            backgroundColor={'#fd5c63'}
          />
        ))}
      </View>
      <DailyMealPlan
        fullListWidth={true}
        Menu={menuData}
        showDay={false}
        date={route?.params?.date}
      />
      <View style={styles.dishTypeContainer}>
        {['Staple', 'Main', 'Side', 'Soup'].map(t => (
          <ChoiceButton
            title={t}
            selectedOption={type}
            setSelectedOption={setType}
            backgroundColor={'#E9967A'}
          />
        ))}
      </View>
      <View style={styles.addFormContainer}>
        <TextInput
          value={item}
          onChangeText={text => setItem(text)}
          placeholder="Dish name"
          style={styles.dishTextInput}
        />
        <Pressable onPress={addDishToMenu} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fd5c63',
  },
  backButton: {
    flex: 1,
    color: 'white',
  },
  dateText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'white',
  },
  mealTypeContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 12,
  },
  mealTypeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
    fontSize: 14,
    fontWeight: '600',
  },
  dishTypeContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    gap: 10,
  },
  dishTypeButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 15,
  },
  addFormContainer: {
    marginTop: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
  },
  dishTextInput: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    flex: 1,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#fd5c63',
    borderRadius: 6,
    width: 60,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});
