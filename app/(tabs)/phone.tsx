import { View, Text, StyleSheet, Button, TouchableOpacity, Modal, ScrollView, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';
import { sendRequest } from '../../utils/api'

const Phone = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<any[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [simulatedCall, setSimulatedCall] = useState('');

  //request permissions
  const getContacts = async () => {
    setIsLoading(true);
    const { status } = await Contacts.requestPermissionsAsync();
    setPermissionStatus(status);

    if (status === 'granted') {
      try {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        setContacts(data);
        setFilteredContacts(data);
        setModalVisible(true);
      } catch (error) {
        console.error('Error fetching contacts', error);
      }
    } else {
      Alert.alert('Permission Denied', 'We need permission to access your contacts');
    }

    setIsLoading(false);
  };

  //select contacts
  const toggleSelection = (contact: any) => {
    setSelectedContacts((prevSelected) => {
      const isSelected = prevSelected.some((item) => item.id === contact.id);
      return isSelected
        ? prevSelected.filter((item) => item.id !== contact.id)
        : [...prevSelected, contact];
    });
  };

  //search contacts
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  //display selected contacts
  const renderContacts = () => {
    return filteredContacts.map((contact) => (
      <TouchableOpacity
        key={contact.id}
        onPress={() => toggleSelection(contact)}
        style={[
          styles.contactContainer,
          selectedContacts.some((item) => item.id === contact.id) && styles.selectedContact,
        ]}
      >
        <Text style={styles.contactText}>
          {contact.name}: {contact.phoneNumbers ? contact.phoneNumbers[0].number : 'No phone number'}
        </Text>
      </TouchableOpacity>
    ));
  };

  //dnd
  const doNotDisturb = () => {
    setSelectedContacts([]);
  };

  //simulate call
  const simulateCall = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Invalid Number', 'Please enter a 10-digit phone number');
      return;
    }

    const matchedContact = selectedContacts.find((contact) => {
      const contactNumberRaw = contact?.phoneNumbers?.[0]?.number || '';
      const contactDigits = contactNumberRaw.replace(/\D/g, '').slice(-10);
      return contactDigits === phoneNumber;
    });

    if (matchedContact) {
      const message = `Simulating phone call from ${matchedContact.name}...`;
      setSimulatedCall(message);
      sendRequest('field5', 1)
      setTimeout(() => { 
        setSimulatedCall(''); 
        sendRequest('field5', 0)
      }, 30000);
      
    } else {
      Alert.alert('This number is not in your favorites');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.boxOne}>
        <Button
          title={isLoading ? 'Loading Contacts...' : 'Get Contacts'}
          onPress={getContacts}
          disabled={isLoading}
        />

        <View style={styles.selectedContactsContainer}>
          <Text style={styles.selectedContactsTitle}>Favorite Contacts</Text>
          {selectedContacts.length > 0 ? (
            selectedContacts.map((contact) => (
              <Text key={contact.id} style={styles.selectedContactText}>
                {contact.name}
              </Text>
            ))
          ) : (
            <Text>No contacts selected.</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={doNotDisturb}
          style={styles.dndButton}
        >
          <Text style={styles.buttonText}>Do Not Disturb</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Contacts</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search Contacts"
            value={searchQuery}
            onChangeText={handleSearch}
          />

          <ScrollView style={styles.scrollView}>
            {renderContacts()}
          </ScrollView>

          <TouchableOpacity style={styles.doneButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.boxOne}>
        <Text style={styles.selectedContactsTitle}>Simulate a Phone Call</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter a phone number"
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={10}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ''))}
        />

        {simulatedCall !== '' && (
          <Text style={{ fontSize: 16, color: 'black', textAlign: 'center', marginTop: 10 }}>
            {simulatedCall}
          </Text>
        )}
        <TouchableOpacity
          onPress={simulateCall}
          style={styles.simulateButton}
        >
          <Text style={styles.buttonText}>Simulate Call</Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
  );
};

export default Phone;

const styles = StyleSheet.create({
  container: {
    marginTop: '25%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxOne: {
    width: '100%',
    backgroundColor: '#FCFDFF', //white
    borderRadius: 12,
    padding: 16,
    marginBottom: 60,
  },
  contactContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  selectedContact: {
    backgroundColor: '#a0e0a0', //green
  },
  contactText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  scrollView: {
    marginBottom: 20,
  },
  doneButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignSelf: 'center',
  },
  selectedContactsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#F2F3F3', 
    width: '100%',
    borderRadius: 5,
  },
  selectedContactsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  selectedContactText: {
    fontSize: 16,
  },
  dndButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#b8c9d6',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  phoneInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    marginTop: 20,
    width: '100%',
  }, 
  simulateButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#68bbe3', //blue
    marginTop: 20,
    alignSelf: 'center',
  },
  
});
