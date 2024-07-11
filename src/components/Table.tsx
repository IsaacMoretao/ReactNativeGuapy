import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { Feather as FiIcon, FontAwesome as FaIcon } from '@expo/vector-icons';

type Product = {
  id: number;
  nome: string;
  observacoes: string;
  valor: string;
  quantidade: number;
  date: string;
  foto: string | undefined;
};

type ProductTableProps = {
  onSelectItem: (id: number) => void;
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
  products: Product[];
};

const ProductTable: React.FC<ProductTableProps> = ({
  onSelectItem,
  selectedItems,
  setSelectedItems,
  products,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    nome: '',
    observacoes: '',
    quantidade: '',
    date: '',
  });
  const [appliedFilters, setAppliedFilters] = useState({
    nome: '',
    observacoes: '',
    quantidade: '',
    date: '',
  });
  const { darkMode } = useTheme();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.nome.toLowerCase().includes(appliedFilters.nome.toLowerCase()) &&
      product.observacoes.toLowerCase().includes(appliedFilters.observacoes.toLowerCase()) &&
      product.quantidade.toString().includes(filters.quantidade)
    );
  });

  const currentItems = filteredProducts.slice((currentPage - 1) * 10, currentPage * 10);
  const totalPages = Math.ceil(filteredProducts.length / 10);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = filteredProducts.map((product) => product.id);
      setSelectedItems(allItemIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const clearFilters = () => {
    setFilters({
      nome: '',
      observacoes: '',
      quantidade: '',
      date: '',
    });
    setAppliedFilters({
      nome: '',
      observacoes: '',
      quantidade: '',
      date: '',
    });
    setCurrentPage(1);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, darkMode ? styles.headerDark : styles.headerLight]}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleSelectAll}>
            <View style={styles.checkbox}>
              <FiIcon name={selectAll ? 'check-square' : 'square'} size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>IMAGEM</Text>
          <FiIcon name="filter" size={20} color="black" />
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>NOME DO PRODUTO</Text>
          <FiIcon name="filter" size={20} color="black" />
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>DESCRIÇÃO</Text>
          <FiIcon name="filter" size={20} color="black" />
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>VALOR</Text>
          <FiIcon name="filter" size={20} color="black" />
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>QUANTIDADE</Text>
          <FiIcon name="filter" size={20} color="black" />
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>DATA DE CADASTRO</Text>
          <FiIcon name="filter" size={20} color="black" />
        </View>
      </View>

      <View style={styles.table}>
        {currentItems.map((product, index) => (
          <TouchableOpacity key={index} style={styles.row} onPress={() => handleSelectItem(product.id)}>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => handleSelectItem(product.id)}>
                <View style={styles.checkbox}>
                  <FiIcon name={selectedItems.includes(product.id) ? 'check-square' : 'square'} size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cell}>
              <Image source={{ uri: product.foto || 'default-image.jpg' }} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>{product.nome}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>{product.observacoes}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>{product.valor}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>{product.quantidade}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.text}>{product.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => handlePageChange(1)} disabled={currentPage === 1}>
          <FiIcon name="skip-back" size={24} color={currentPage === 1 ? 'gray' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <FiIcon name="chevron-left" size={24} color={currentPage === 1 ? 'gray' : 'black'} />
        </TouchableOpacity>
        <Text style={styles.pageText}>{currentPage}</Text>
        <TouchableOpacity onPress={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <FiIcon name="chevron-right" size={24} color={currentPage === totalPages ? 'gray' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
          <FiIcon name="skip-forward" size={24} color={currentPage === totalPages ? 'gray' : 'black'} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterButtons}>
        <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
          <Text style={styles.filterButtonText}>Criar Filtro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearFilterButton} onPress={clearFilters}>
          <Text style={styles.clearFilterButtonText}>Limpar Filtro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  headerDark: {
    backgroundColor: '#333333',
    borderBottomColor: '#555555',
  },
  headerLight: {
    backgroundColor: '#f0f0f0',
    borderBottomColor: '#cccccc',
  },
  headerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
    color: 'black',
  },
  table: {
    flex: 1,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  pageText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  filterButton: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  clearFilterButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  clearFilterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProductTable;
