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
Phone call
- send 1 until phone is done ringging and then back to 0

things to think about later
- when i reopen the app, all colors restart even though api still remmbers previous data
*/