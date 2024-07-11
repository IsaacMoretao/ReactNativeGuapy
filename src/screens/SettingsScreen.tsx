import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import Aside from '../components/Aside';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Settings: React.FC<{ product: Product }> = ({ product }) => {
  const { darkMode, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#232323' : '#FFFFFF',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    text: {
      color: darkMode ? '#FFFFFF' : '#000000',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
      marginBottom: 20,
    },
    button: {
      backgroundColor: darkMode ? '#1E88E5' : '#2196F3',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#FFFFFF',
      textAlign: 'center',
    },
    asideContainer: {
      width: 80,
      backgroundColor: darkMode ? '#1D1D1D' : '#FFFFFF',
    },
    scrollViewContent: {
      padding: 16, // Estilo para o conteúdo do ScrollView
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <Text style={[styles.text, { fontSize: 24, fontWeight: 'bold' }]}>{product.name}</Text>
        <Text style={styles.text}>{product.description}</Text>
        <Text style={[styles.text, { marginTop: 10 }]}>Price: ${product.price}</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.button}>
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.asideContainer}>
        <Aside />
      </View>
    </View>
  );
}

export default Settings;
