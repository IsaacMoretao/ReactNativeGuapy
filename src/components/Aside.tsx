import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useNavigation, useRoute } from '@react-navigation/native';

import Logo from '../../assets/Logo.svg';
import Home from '../../assets/Home.svg';
import Book from '../../assets/Book.svg';
import Box from '../../assets/Box.svg';
import Settings from '../../assets/Settings.svg';
import HamburguerButton from '../../assets/HamburguerButton.svg';

const { width, height } = Dimensions.get('window');

type NavItem = {
  href: string;
  src: any;
  alt: string; 
};

export function Aside() {
  const { darkMode } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const currentPath = route.name;

  const navItems: NavItem[] = [
    { href: 'Home', src: Home, alt: 'Home' },
    { href: 'Products', src: Book, alt: 'Book' },
    { href: '#', src: Box, alt: 'Box' },
    { href: '#', src: Settings, alt: 'Settings' },
    { href: '#', src: HamburguerButton, alt: 'HamburguerButton' },
  ];

  return (
    <View
      style={[
        styles.nav,
        darkMode ? styles.navDark : styles.navLight,
        width <= 768 ? styles.navSmallScreen : null,
      ]}
    >
      {width > 768 && (
        <View style={styles.logoContainer}>
          <Image
            source={Logo}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      )}
      <View style={[styles.itemsContainer, width <= 768 ? styles.itemsContainerSmallScreen : null]}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.navItem,
              currentPath === item.href ? styles.navItemActive : null,
              width <= 768 ? styles.navItemSmallScreen : null,
            ]}
            onPress={() => navigation.navigate(item.href as never)}
          >
            {currentPath === item.href && <View style={styles.activeIndicator} />}
            <Image
              source={item.src}
              style={styles.navItemImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: -60,
    bottom: 0,
    width: 80,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navDark: {
    backgroundColor: '#333',
  },
  navLight: {
    backgroundColor: '#d9d9d9',
  },
  navSmallScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 80,
    top: "auto",
    bottom: 0,
    left: 0,
    right: 0,
  },
  logoContainer: {
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 56,
  },
  itemsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemsContainerSmallScreen: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  navItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  navItemSmallScreen: {
    marginBottom: 0,
  },
  navItemActive: {
    borderRadius: 25,
    marginBottom: 0,
  },
  activeIndicator: {
    position: 'absolute',
    borderRadius: 4,
    left: 0,
    top: '30%',
    transform: [{ translateY: -1 }],
    width: 4,
    height: 30,
    backgroundColor: 'blue',
  },
  navItemImage: {
    width: 30,
    height: 30,
  },
});

export default Aside;
