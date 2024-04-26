import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

const ChoiceButton = ({
  title,
  selectedOption,
  setSelectedOption,
  backgroundColor,
}) => {
  return (
    <Pressable
      onPress={() => {
        setSelectedOption(title);
      }}
      style={[
        styles.buttonStyle,
        {
          backgroundColor: selectedOption === title ? backgroundColor : 'white',
        },
      ]}>
      <Text
        style={[
          styles.textStyle,
          {color: selectedOption === title ? 'white' : 'black'},
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ChoiceButton;

const styles = StyleSheet.create({
  buttonStyle: {
    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 25,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '600',
  },
});
