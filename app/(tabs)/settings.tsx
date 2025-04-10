import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Light Pattern</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} />
          <TouchableOpacity style={styles.button} />
          <TouchableOpacity style={styles.button} />
        </View>
      </View>

      <View style={[styles.box, styles.boxTwo]}>
        <Text style={styles.boxTitle}>Vibration Pattern</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} />
          <TouchableOpacity style={styles.button} />
          <TouchableOpacity style={styles.button} />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', 
  },
  box: {
    height: '40%',
    backgroundColor: '#ffcce0', //light pink
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  boxTwo: {
    backgroundColor: '#ffe0b3', //light orange
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row', //arranges buttons horizontally
    justifyContent: 'space-evenly', //evenly spaces the buttons
    flexGrow: 1,
    marginTop: 80,
  },
  button: {
    width: 80,  
    height: 80, 
    borderRadius: 40,  
    backgroundColor: '#eeeeee', //light grey
    borderWidth: 2, 
    borderColor: '#d9d9d9',  //dark grey
  },
});
