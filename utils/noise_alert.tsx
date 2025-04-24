import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

type AlertContextType = {
  showNoiseAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertShown, setAlertShown] = useState(false);

  const showNoiseAlert = () => {
    if (!alertShown) {
      setAlertShown(true);
      Alert.alert(
        'Noise Detected',
        'A loud noise was detected by the device!',
        [{ text: 'OK', onPress: () => setAlertShown(false) }],
        { cancelable: true }
      );
    }
  };

  return (
    <AlertContext.Provider value={{ showNoiseAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};
