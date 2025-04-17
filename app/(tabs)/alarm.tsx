import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sendRequest } from '../../utils/api'

const Alarm = () => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [isAlarmSet, setIsAlarmSet] = useState(false); 
  const [buttonColor, setButtonColor] = useState('#b8c9d6'); 
  const [snoozeState, setSnoozeState] = useState(0);
  const [snoozeColor, setSnoozeColor] = useState('#68bbe3');
  const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

  //time picker
  const onChange = (_event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    setShow(false); 
  };

  //alarm on/off
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

  //snooze 
  const toggleSnooze = async () => {
    const newSnoozeState = snoozeState < 2 ? 100 : snoozeState + 1;
    setSnoozeState(newSnoozeState);
    //setSnoozeColor(newSnoozeState >= 2 ? '#68bbe3' : '#b8c9d6');
    await sendRequest('field4', newSnoozeState);
  };

  //stop 
  const toggleStop = async () => {
    await sendRequest('field4', 1);
    //setSnoozeColor('#b8c9d6');
    await delay(15000);
    await sendRequest('field4', 0);
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
        { hour: '2-digit', minute: '2-digit' })}
      </Text>

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

      <TouchableOpacity
        onPress={toggleSnooze}
        style={[styles.snoozeButton, { backgroundColor: snoozeColor }]}
      >
        <Text style={styles.buttonText}>
          {snoozeState >= 2 ? 'Snoozed' : 'Snooze'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={toggleStop}
        style={styles.cancelButton}
      >
        <Text style={styles.buttonText}>Stop</Text>
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
  snoozeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#68bbe3',
  },
  cancelButton: {
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 5,
  backgroundColor: 'red',
  marginTop: 10,
},
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
