import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, useWindowDimensions } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import Aside from '../components/Aside';
import axios from 'axios';

interface Product {
  id: string;
  foto: string | null;
  nome: string;
  observacoes: string;
  valor: string;
  quantidade: string;
}

export function ProductsScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  const { darkMode } = useTheme();

  const [produto, setProduto] = useState<Product>({
    id: '',
    foto: null,
    nome: '',
    observacoes: '',
    valor: '',
    quantidade: '',
  });

  const handleChange = (name: string, value: string | null) => {
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (uri: string) => {
    setProduto((prev) => ({
      ...prev,
      foto: uri,
    }));
  };

  const handleSubmit = async () => {
    try {
      const id = new Date().getTime().toString();

      const formData = new FormData();
      formData.append('id', id);
      formData.append('nome', produto.nome);
      formData.append('observacoes', produto.observacoes);
      formData.append('valor', produto.valor);
      formData.append('quantidade', produto.quantidade);
      if (produto.foto) {
        formData.append('foto', {
          uri: produto.foto,
          type: 'image/jpeg',
          name: 'photo.jpg',
        } as any);
      }

      const response = await axios.post('/api/salvarProduto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message);
      setProduto({
        id: '',
        foto: null,
        nome: '',
        observacoes: '',
        valor: '',
        quantidade: '',
      });
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto');
    }
  };

  return (
    <View style={[styles.container, isLargeScreen && styles.containerLarge, { backgroundColor: darkMode ? '#1D1D1D' : '#FFFFFF' }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.formContainer, { backgroundColor: darkMode ? '#232323' : '#FFFFFF' }]}>
          <Text style={[styles.header, { color: darkMode ? '#FFFFFF' : '#000000' }]}>Cadastrar Produto</Text>
          <View style={[styles.form, !isLargeScreen && styles.formColumn]}>
            {isLargeScreen ? (
              <TouchableOpacity style={styles.imageContainer} onPress={() => handleFileChange('https://via.placeholder.com/250')}>
                {produto.foto ? (
                  <Image source={{ uri: produto.foto }} style={styles.image} />
                ) : (
                  <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Selecione um arquivo</Text>
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.fileButton} onPress={() => handleFileChange('https://via.placeholder.com/250')}>
                <Text style={styles.fileButtonText}>Selecione um arquivo</Text>
              </TouchableOpacity>
            )}
            <View style={styles.div}>
              <TextInput
                style={[styles.input, { backgroundColor: darkMode ? '#232323' : '#FFFFFF', color: darkMode ? '#FFFFFF' : '#000000' }]}
                placeholder="Nome do Produto"
                placeholderTextColor={darkMode ? '#FFFFFF' : '#000000'}
                value={produto.nome}
                onChangeText={(value) => handleChange('nome', value)}
              />
              <TextInput
                style={[styles.input, { backgroundColor: darkMode ? '#232323' : '#FFFFFF', color: darkMode ? '#FFFFFF' : '#000000' }]}
                placeholder="Observações"
                placeholderTextColor={darkMode ? '#FFFFFF' : '#000000'}
                value={produto.observacoes}
                onChangeText={(value) => handleChange('observacoes', value)}
                multiline
              />
              <Text style={[styles.characterCount, { color: darkMode ? '#FFFFFF' : '#000000' }]}>00/100</Text>
              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: darkMode ? '#FFFFFF' : '#000000' }]}>Valor</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: darkMode ? '#232323' : '#FFFFFF', color: darkMode ? '#FFFFFF' : '#000000' }]}
                    placeholder="R$"
                    placeholderTextColor={darkMode ? '#FFFFFF' : '#000000'}
                    value={produto.valor}
                    onChangeText={(value) => handleChange('valor', value)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: darkMode ? '#FFFFFF' : '#000000' }]}>Quantidade</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: darkMode ? '#232323' : '#FFFFFF', color: darkMode ? '#FFFFFF' : '#000000' }]}
                    placeholder="Quantidade"
                    placeholderTextColor={darkMode ? '#FFFFFF' : '#000000'}
                    value={produto.quantidade}
                    onChangeText={(value) => handleChange('quantidade', value)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <Text style={[styles.label, { color: darkMode ? '#FFFFFF' : '#000000' }]}>Foto do Produto</Text>
              {!isLargeScreen && (
                <TouchableOpacity style={styles.fileButton} onPress={() => handleFileChange('https://via.placeholder.com/250')}>
                  <Text style={styles.fileButtonText}>Selecione um arquivo</Text>
                </TouchableOpacity>
              )}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => {}}>
                  <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Aside />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 64,
  },
  containerLarge: {
    flexDirection: 'row',
    paddingLeft: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    flexDirection: 'row',
  },
  formColumn: {
    flexDirection: 'column',
  },
  div: {
    flex: 1,
    paddingLeft: 16,
  },
  imageContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#6200EE',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
  },
  characterCount: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  fileButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  fileButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#A9A9A9',
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: '#8A2BE2',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProductsScreen;
