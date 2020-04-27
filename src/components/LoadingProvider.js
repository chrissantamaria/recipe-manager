import React, { useState, createContext, useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { StyleSheet } from 'react-native';

const LoadingContext = createContext(false);
const useLoading = () => useContext(LoadingContext);
export default useLoading;

export function LoadingProvider({ children }) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      {children}
    </LoadingContext.Provider>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
});
