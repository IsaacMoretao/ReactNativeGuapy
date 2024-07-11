import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Product } from '../types/types';

type EditProductModalProps = {
  visible: boolean;
  onClose: () => void;
  product: Product;
  onSave: (product: Product) => void;
};

const EditProductModal: React.FC<EditProductModalProps> = ({ visible, onClose, product, onSave }) => {
  const [nome, setNome] = useState(product.nome);
  const [observacoes, setObservacoes] = useState(product.observacoes);
  const [valor, setValor] = useState(product.valor);
  const [quantidade, setQuantidade] = useState(product.quantidade.toString());

  const handleSave = () => {
    const updatedProduct = { ...product, nome, observacoes, valor, quantidade: parseInt(quantidade) };
    onSave(updatedProduct);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Produto</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" />
          <TextInput style={styles.input} value={observacoes} onChangeText={setObservacoes} placeholder="Observações" />
          <TextInput style={styles.input} value={valor} onChangeText={setValor} placeholder="Valor" keyboardType="numeric" />
          <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} placeholder="Quantidade" keyboardType="numeric" />
          <Button title="Salvar" onPress={handleSave} />
          <Button title="Cancelar" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default EditProductModal;
