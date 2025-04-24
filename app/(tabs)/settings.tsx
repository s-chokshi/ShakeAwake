import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { sendRequest } from '../../utils/api';

const Settings = () => {
  const [selectedLight, setSelectedLight] = useState<number | null>(null);
  const [selectedVibration, setSelectedVibration] = useState<number | null>(null);

  const disablePattern = async (fieldName: string) => {
    if (fieldName === 'field6') {
      setSelectedLight(null);
      sendRequest(fieldName, 0);
    } else if (fieldName === 'field7') {
      setSelectedVibration(null);
      sendRequest(fieldName, 0);
    }
  };

  return (
    <View style={styles.container}>
      {/* Light Pattern Box */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Light Pattern</Text>
        <View style={styles.buttonsContainer}>
          {[1, 2, 3].map((pattern) => (
            <TouchableOpacity
              key={`light-${pattern}`}
              style={[
                styles.button,
                selectedLight === pattern && styles.selectedButton
              ]}
              onPress={() => {
                setSelectedLight(pattern);
                sendRequest('field6', pattern);
              }}
            >
              <Text style={styles.buttonText}>{pattern}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => disablePattern('field6')}
          style={styles.disableButton}
        >
          <Text style={styles.disableButtonText}>Disable Light</Text>
        </TouchableOpacity>
      </View>

      {/* Vibration Pattern Box */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Vibration Pattern</Text>
        <View style={styles.buttonsContainer}>
          {[1, 2, 3].map((pattern) => (
            <TouchableOpacity
              key={`vibration-${pattern}`}
              style={[
                styles.button,
                selectedVibration === pattern && styles.selectedButton
              ]}
              onPress={() => {
                setSelectedVibration(pattern);
                sendRequest('field7', pattern);
              }}
            >
              <Text style={styles.buttonText}>{pattern}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => disablePattern('field7')}
          style={styles.disableButton}
        >
          <Text style={styles.disableButtonText}>Disable Vibration</Text>
        </TouchableOpacity>
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
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 50,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eeeeee',
    borderWidth: 2,
    borderColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  selectedButton: {
    backgroundColor: 'rgba(10, 126, 164, 0.5)',
  },
  disableButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#b8c9d6',
    marginTop: 35,
    alignSelf: 'center',
  },
  disableButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
