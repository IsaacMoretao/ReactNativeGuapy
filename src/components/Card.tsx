import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types/types';
import EditProductModal from './EditProductModal';
import { useTheme } from '../contexts/themeContext'; // Importe o hook useTheme

type ProductCardProps = {
  product: Product;
  onSave: (updatedProduct: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onSave }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(product);
  const { darkMode } = useTheme(); // Obtém o estado darkMode do contexto de tema

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    setModalVisible(true);
    setMenuVisible(false);
  };

  const handleSave = (updatedProduct: Product) => {
    setCurrentProduct(updatedProduct);
    onSave(updatedProduct);
  };

  return (
    <View style={[styles.card, darkMode && styles.cardDark]}>
      <Image
        source={{ uri: currentProduct.foto || 'https://via.placeholder.com/60' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, darkMode && styles.titleDark]}>{currentProduct.nome}</Text>
          <View style={styles.headerRight}>
            <Text style={[styles.date, darkMode && styles.dateDark]}>{`Data de Cadastro: ${currentProduct.date}`}</Text>
            <TouchableOpacity onPress={toggleMenu}>
              <Text style={[styles.menuButton, darkMode && styles.menuButtonDark]}>&#x22EE;</Text>
            </TouchableOpacity>
            {menuVisible && (
              <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                  <Text style={[styles.menuItemText, darkMode && styles.menuItemTextDark]}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={[styles.menuItemText, darkMode && styles.menuItemTextDark]}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <Text style={[styles.observacoes, darkMode && styles.observacoesDark]}>{currentProduct.observacoes}</Text>
        <View style={styles.footer}>
          <Text style={[styles.footerText, darkMode && styles.footerTextDark]}>{`Valor: R$ ${currentProduct.valor}`}</Text>
          <Text style={[styles.footerText, darkMode && styles.footerTextDark]}>{`Quantidade: ${currentProduct.quantidade} Und.`}</Text>
        </View>
      </View>
      <EditProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={currentProduct}
        onSave={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    position: 'relative',
    backgroundColor: '#fff',
  },
  cardDark: {
    backgroundColor: '#444', // Exemplo de fundo escuro para tema dark
    borderColor: '#666', // Exemplo de borda mais escura para tema dark
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingLeft: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  titleDark: {
    color: '#fff', // Ajuste da cor do texto para tema dark
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    color: '#777',
    fontSize: 12,
    marginRight: 8,
  },
  dateDark: {
    color: '#ccc', // Ajuste da cor do texto para tema dark
  },
  menuButton: {
    fontSize: 20,
    color: '#333',
  },
  menuButtonDark: {
    color: '#ccc', // Ajuste da cor do texto para tema dark
  },
  menu: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: 100,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 50,
  },
  menuItem: {
    padding: 10,
  },
  menuItemText: {
    fontSize: 14,
    color: '#333',
  },
  menuItemTextDark: {
    color: '#000', // Ajuste da cor do texto para tema dark
  },
  observacoes: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  observacoesDark: {
    color: '#ccc', // Ajuste da cor do texto para tema dark
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: -1,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
  },
  footerTextDark: {
    color: '#ccc', // Ajuste da cor do texto para tema dark
  },
});

export default ProductCard;
