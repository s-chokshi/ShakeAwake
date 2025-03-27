import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Alarm = () => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isAlarmSet, setIsAlarmSet] = useState(false); 
  const [buttonColor, setButtonColor] = useState('#b8c9d6'); 

  //time picker
  const onChange = (_event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    setShow(false); 
  };

  //api request (send data)
  const API_KEY = '0MJJMI1MBH6UVIA3';
  const BASE_URL = 'https://api.thingspeak.com/update';
  const sendRequest = async (fieldName: string, fieldValue: number) => {
    try {
      const url = `${BASE_URL}?api_key=${API_KEY}&${fieldName}=${fieldValue}`;
      console.log('Sending request to:', url);
  
      const response = await fetch(url);
      const data = await response.text();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  //alarm on/off
  const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
  const toggleAlarm = async () => {
    const newAlarmState = !isAlarmSet
    setIsAlarmSet(newAlarmState); 
    setButtonColor(newAlarmState ? 'green' : '#b8c9d6'); 

    await sendRequest('field1', newAlarmState ? 1 : 0);
    if (newAlarmState) { 
        await delay(15000);
        await sendRequest('field2', time.getHours());
        await delay(15000);
        await sendRequest('field3', time.getMinutes());
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Time" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={time}
          mode="time"
          display="spinner"
          onChange={onChange}
        />
      )}
      <Text style={styles.text}>Selected Time: {time.toLocaleTimeString([], 
        { hour: '2-digit', minute: '2-digit' })}</Text>

      <TouchableOpacity
        onPress={toggleAlarm}
        style={[
          styles.alarmButton, 
          { backgroundColor: buttonColor } 
        ]}
      >
        <Text style={styles.buttonText}>
          {isAlarmSet ? 'Alarm Set' : 'Set Alarm'} 
        </Text>
      </TouchableOpacity>
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
  alarmButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
