import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Alarm = () => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (_event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    if (Platform.OS === 'android') {
      setShow(false); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Selected Time: {time.toLocaleTimeString([], 
        { hour: '2-digit', minute: '2-digit' })}</Text>
      <Button title="Select Time" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={onChange}
        />
      )}
      <Button title="Set Alarm" /> 
    </View>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});