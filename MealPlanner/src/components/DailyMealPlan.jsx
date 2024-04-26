import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';

const DailyMealPlan = ({
  date,
  Menu,
  fullListWidth = false,
  showDay = true,
  isDateFormatted = true,
}) => {
  const currentDate = moment();
  const formattedDate = isDateFormatted ? date : date?.format?.('ddd DD');
  const isCurrentDay = date?.isSame?.(currentDate, 'day');
  const menuForDate = Menu?.find?.(menu => menu.date === formattedDate);
  const navigation = useNavigation();
  const route = useRoute();

  const renderMealItems = mealType => {
    if (menuForDate?.items.some(item => item.mealType === mealType)) {
      return (
        <View>
          <View style={styles.mealHeader}>
            <Text style={styles.mealHeaderText}>{mealType}</Text>
          </View>
          {menuForDate?.items
            ?.filter(item => item.mealType === mealType)
            .map((item, index) => (
              <View style={styles.mealItemContainer} key={index}>
                <View style={styles.mealTypeBadge}>
                  <Text style={styles.mealTypeBadgeText}>{item.type}</Text>
                </View>
                <Text style={styles.mealItemText}>{item.name}</Text>
              </View>
            ))}
        </View>
      );
    }
    return null;
  };

  const handleCopy = () => {
    SheetManager.show('CopySheet', {
      payload: {
        date: formattedDate,
      },
    });
  };

  const handleDelete = () => {
    SheetManager.show('DeleteSheet', {
      payload: {
        date: formattedDate,
      },
    });
  };

  return (
    <View style={styles.container}>
      {showDay && (
        <View
          style={[
            styles.dateContainer,
            isCurrentDay && styles.currentDateContainer,
          ]}>
          <Text
            style={[styles.dateText, isCurrentDay && styles.currentDateText]}>
            {date?.format?.('DD')}
          </Text>
          <Text
            style={[styles.dateText, isCurrentDay && styles.currentDateText]}>
            {date?.format?.('ddd')}
          </Text>
        </View>
      )}

      <Pressable
        onPress={() => {
          if (route.name !== 'Menu')
            navigation.navigate('Menu', {
              date: date?.format?.('ddd') + ' ' + date?.format?.('DD'),
              menu: Menu,
            });
        }}
        style={[
          styles.menuContainer,
          menuForDate ? null : styles.noMenuContainer,
          {width: fullListWidth ? '100%' : '85%'},
        ]}>
        <Text style={styles.menuHeaderText}>
          {menuForDate ? 'Meal Plan' : 'There is no menu'}
        </Text>
        {menuForDate && (
          <View>
            {renderMealItems('Breakfast')}
            {renderMealItems('Lunch')}
            {renderMealItems('Dinner')}
          </View>
        )}
        <Pressable style={styles.copyButton} onPress={handleCopy}>
          <Text style={styles.buttonText}>Copy</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
  },
  dateContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentDateContainer: {
    backgroundColor: 'black',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'black',
  },
  currentDateText: {
    color: 'white',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    width: '85%',
  },
  noMenuContainer: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuHeaderText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: 'gray',
  },
  mealHeader: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginVertical: 5,
    borderRadius: 20,
    width: 100,
  },
  mealHeaderText: {
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
  mealItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  mealTypeBadge: {
    backgroundColor: '#fd5c63',
    padding: 7,
    borderRadius: 20,
  },
  mealTypeBadgeText: {
    fontSize: 11,
    textAlign: 'center',
    color: 'white',
  },
  mealItemText: {
    fontWeight: '500',
  },
  copyButton: {
    position: 'absolute',
    bottom: 5,
    right: 50,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'gray',
  },
});

export default DailyMealPlan;
