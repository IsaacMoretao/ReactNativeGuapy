import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import ProductCard from '../components/Card';
import Aside from '../components/Aside';
import { Product } from '../types/types';
import { useTheme } from '../contexts/themeContext';

const initialProducts: Product[] = [
  {
    foto: 'https://via.placeholder.com/60',
    nome: 'Produto 1',
    date: '2023-07-10',
    observacoes: 'Observações do Produto 1',
    valor: '100.00',
    quantidade: 10,
  },
  {
    foto: 'https://via.placeholder.com/60',
    nome: 'Produto 2',
    date: '2023-07-11',
    observacoes: 'Observações do Produto 2',
    valor: '200.00',
    quantidade: 20,
  },
  {
    foto: 'https://via.placeholder.com/60',
    nome: 'Produto 3',
    date: '2023-07-12',
    observacoes: 'Observações do Produto 3',
    valor: '300.00',
    quantidade: 30,
  },
];

export function HomeScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { darkMode } = useTheme();

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => (product.nome === updatedProduct.nome ? updatedProduct : product)));
  };

  return (
    <View style={[styles.container, isLargeScreen && styles.containerLarge, darkMode && styles.containerDark]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} onSave={handleSaveProduct} />
        ))}
      </ScrollView>
      <Aside />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerLarge: {
    paddingLeft: 80,
  },
  containerDark: {
    backgroundColor: '#1D1D1D',
  },
  scrollViewContent: {
    padding: 16,
  },
});

export default HomeScreen;
