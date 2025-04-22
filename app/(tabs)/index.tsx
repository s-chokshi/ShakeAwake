import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { readRequest } from '../../utils/api';

const HomeScreen = () => {
  const [batteryHealth, setBatteryHealth] = useState(0);
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [chargingStationConnected, setChargingStationConnected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await readRequest();

        if (data) {
          setBatteryHealth(data.field2 !== null ? Number(data.field2) : 0);
          setDeviceConnected(data.field3 === '1');
          setChargingStationConnected(data.field4 === '1');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // run immediately
    const interval = setInterval(fetchData, 1000); //1 sec

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Shake Awake!</Text>

      <View style={styles.statusContainer}>
        <StatusCard label="Device" connected={deviceConnected} />
        <StatusCard label="Charging Station" connected={chargingStationConnected} />
      </View>

      <View style={styles.batteryCardContainer}>
        <BatteryCard batteryLevel={batteryHealth} />
      </View>
    </View>
  );
};

//device/charging station card
const StatusCard = ({ label, connected }: { label: string; connected: boolean }) => {
  return (
    <View style={styles.card}>
      <Ionicons
        name={connected ? 'checkmark-circle' : 'close-circle'}
        size={40}
        color={connected ? 'green' : 'red'}
      />
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.connectionStatus}>
        {connected ? 'Connected' : 'Not Connected'}
      </Text>
    </View>
  );
};

//battery level card
const BatteryCard = ({ batteryLevel }: { batteryLevel: number }) => {
  return (
    <View style={styles.batteryCard}>
      <Text style={styles.batteryLabel}>Battery Level: {batteryLevel}% </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 80,
    marginTop: '5%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    flexWrap: 'wrap',
    gap: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 20,
    width: 160,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  connectionStatus: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  batteryCardContainer: {
    width: '100%',
    height: 125,
    justifyContent: 'center', 
    padding: 20,
    marginTop: 5,
  },
  batteryCard: {
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 30,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%', 
  },
  batteryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  }
});

export default HomeScreen;
