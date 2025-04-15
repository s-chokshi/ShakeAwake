import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { sendRequest } from '../../utils/api'

const Settings = () => {
  const [selectedLight, setSelectedLight] = useState<number | null>(null);
  const [selectedVibration, setSelectedVibration] = useState<number | null>(null);
  
  const disablePattern = async (fieldName: string) => {
    if (fieldName == 'field6') {
      setSelectedLight(null);
      sendRequest(fieldName, 0);
    } else if (fieldName == 'field7'){
      setSelectedVibration(null);
      sendRequest(fieldName, 0);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Light Pattern</Text>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedLight === 1 && styles.selectedButton
          ]}
          onPress={() => {
            setSelectedLight(1);
            sendRequest('field6', 1);
          }}
        > <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
          
        <TouchableOpacity
          style={[
            styles.button,
            selectedLight === 2 && styles.selectedButton
          ]}
          onPress={() => {
            setSelectedLight(2);
            sendRequest('field6', 2);
          }}
        > <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
          
        <TouchableOpacity
          style={[
            styles.button,
            selectedLight === 3 && styles.selectedButton
          ]}
          onPress={() => {
            setSelectedLight(3);
            sendRequest('field6', 3);
          }}
        > <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={() => disablePattern('field6')}
          style={styles.disableButton}
          > <Text style={styles.disableButtonText}>Disable Light</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.box, styles.boxTwo]}>
        <Text style={styles.boxTitle}>Vibration Pattern</Text>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedVibration === 1 && styles.selectedButton
          ]}
          onPress={() => {
            setSelectedVibration(1);
            sendRequest('field7', 1);
          }}
        > <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
          
        <TouchableOpacity
          style={[
            styles.button,
            selectedVibration === 2 && styles.selectedButton
          ]}
          onPress={() => {
            setSelectedVibration(2);
            sendRequest('field7', 2);
          }}
        > <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
          
        <TouchableOpacity
          style={[
            styles.button,
            selectedVibration === 3 && styles.selectedButton
          ]}
          onPress={() => {
            setSelectedVibration(3);
            sendRequest('field7', 3);
          }}
        > <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => disablePattern('field7')}
          style={styles.disableButton}
          > <Text style={styles.disableButtonText}>Disable Vibration</Text>
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
    backgroundColor: '#EAEAEA', //light grey
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  boxTwo: {
    backgroundColor: '#EAEAEA', //light grey
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
    marginTop: 50,
  },
  button: {
    width: 80,  
    height: 80, 
    borderRadius: 40,  
    backgroundColor: '#eeeeee', //light grey
    borderWidth: 2, 
    borderColor: '#d9d9d9',  //dark grey
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  },
  selectedButton: {
    backgroundColor: 'rgba(10, 126, 164, 0.5)', //teal
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
    textAlign: 'center'
  },
});
