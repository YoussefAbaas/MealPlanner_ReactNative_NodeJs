import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import DailyMealPlan from '../components/DailyMealPlan';
import {MenuContext} from '../contexts/MenuContext';

const HomeScreen = () => {
  const currentDate = moment();
  const startOfWeek = currentDate.clone().startOf('week');
  const {menuData, fetchAllMenuData} = useContext(MenuContext);

  useFocusEffect(
    useCallback(() => {
      fetchAllMenuData();
    }, []),
  );

  const renderWeekDates = startOfWeek => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.clone().add(i, 'days');
      weekDates.push(
        <DailyMealPlan
          key={date}
          date={date}
          Menu={menuData}
          isDateFormatted={false}
        />,
      );
    }
    return weekDates;
  };

  const renderWeeks = numWeeks => {
    const weeks = [];
    for (let i = 0; i < numWeeks; i++) {
      weeks.push(
        <View key={i} style={styles.weekContainer}>
          <Text style={styles.weekDate}>
            {startOfWeek
              .clone()
              .add(i * 7, 'days')
              .format('DD MMM')}
          </Text>
          {renderWeekDates(startOfWeek.clone().add(i * 7, 'days'))}
        </View>,
      );
    }
    return weeks;
  };
  return (
    <ScrollView style={{marginTop: 50}}>
      <View style={styles.container}>{renderWeeks(3)}</View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  weekContainer: {
    marginBottom: 20,
  },
  weekDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
