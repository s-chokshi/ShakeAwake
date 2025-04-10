import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Phone = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>phone</Text>
    </View>
  );
};

export default Phone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  //vertical
    alignItems: 'center',  //horizontal
  },
  text: {
    fontSize: 20, 
  }
});

/* 
Alarm
- snooze: 2 (each time it is hit, incremet by 1) (not a toggle, every time it's hit only send the increase)
- stop: 1 (after 15 sec send a 0 and color rests to default)
- default: 0

Light/motor
- option for 1/2/3

Phone call
- send 1 until phone is done ringging and then back to 0

other 
- make global functions file
*/