import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Formulario: React.FC = () => {
  const [numeroMedidor, setNumeroMedidor] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [fotos, setFotos] = useState<string[]>([]);

  const handleNumeroMedidorChange = (text: string) => {
    const soloNumeros = text.replace(/[^0-9]/g, '');
    setNumeroMedidor(soloNumeros);
  };

  const handleSeleccionarFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted) {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!resultado.canceled) {
        setFotos((prevFotos) => [...prevFotos, resultado.assets[0].uri]);
      }
    } else {
      alert('Se requiere permiso para acceder a la galería');
    }
  };

  const handleEliminarFoto = (index: number) => {
    setFotos((prevFotos) => prevFotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Crear el payload
    const payload = {
      numero_medidor: numeroMedidor,
      comentarios: comentarios,
      imagenes: JSON.stringify(fotos), // Convertir las rutas de las imágenes en JSON
    };

    try {
      const response = await fetch('https://127.0.0.1/mi_formulario/insertar.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Datos enviados correctamente');
        // Limpiar el formulario
        setNumeroMedidor('');
        setComentarios('');
        setFotos([]);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Error al enviar los datos al servidor');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Número de medidor:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de medidor"
        value={numeroMedidor}
        onChangeText={handleNumeroMedidorChange}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Comentarios:</Text>
      <TextInput
        style={styles.input}
        placeholder="Agregue un comentario"
        value={comentarios}
        onChangeText={setComentarios}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Fotos:</Text>
      <TouchableOpacity style={styles.button} onPress={handleSeleccionarFoto}>
        <Text style={styles.buttonText}>Seleccionar fotos</Text>
      </TouchableOpacity>

      <View style={styles.fotoContainer}>
        {fotos.map((foto, index) => (
          <View key={index} style={styles.fotoItem}>
            <Image source={{ uri: foto }} style={styles.foto} />
            <TouchableOpacity onPress={() => handleEliminarFoto(index)}>
              <Text style={styles.eliminarTexto}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button title="Enviar" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fotoContainer: {
    marginTop: 10,
  },
  fotoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  eliminarTexto: {
    color: '#FF0000',
    fontSize: 14,
  },
});

export default Formulario;
