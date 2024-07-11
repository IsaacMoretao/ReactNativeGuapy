import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const { width } = useWindowDimensions();

  const currentPath = route.name;
  const isSmallScreen = width < 768;

  return (
    <View
      style={[
        styles.header,
        styles.headerLight,
        isSmallScreen ? styles.headerSmall : styles.headerLarge,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={
            currentPath === 'Home'
              ? require('../../assets/Home.svg')
              : require('../../assets/Book.svg')
          }
          style={{ width: 30, height: 30 }}
        />
        {!isSmallScreen && (
          <Text
            style={styles.text}
          >
            {currentPath === 'Home' ? 'Home' : 'Produtos'}
          </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          styles.button,
          darkMode ? styles.buttonDark : styles.buttonLight,
        ]}
      >
        <View style={styles.buttonContainer}>
          <View style={[styles.switch, darkMode ? styles.switchOn : styles.switchOff]}>
            <View style={[styles.handle, darkMode ? styles.handleOn : styles.handleOff]} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginLeft: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerDark: {
    backgroundColor: '#333',
  },
  headerLight: {
    backgroundColor: '#6574FE',
  },
  headerSmall: {
    marginLeft: 0,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },
  headerLarge: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  text: {
    marginLeft: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonDark: {
    backgroundColor: '#4cd964',
  },
  buttonLight: {
    backgroundColor: '#e5e5ea',
  },
  buttonContainer: {
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    width: 32,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switchOn: {
    backgroundColor: '#4cd964',
    alignItems: 'flex-end',
  },
  switchOff: {
    backgroundColor: '#e5e5ea',
    alignItems: 'flex-start',
  },
  handle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  handleOn: {
    transform: [{ translateX: 5 }],
  },
  handleOff: {
    transform: [{ translateX: 0 }],
  },
});

export default Header;
