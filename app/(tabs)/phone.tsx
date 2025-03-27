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
