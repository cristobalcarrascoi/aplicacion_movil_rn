import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const Formulario: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [numeroCasa, setNumeroCasa] = useState('');
  const [cuentaLuz, setCuentaLuz] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeFecha = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  const handleSubmit = () => {
    // Aquí puedes manejar el envío de datos del formulario
    console.log({
      nombre,
      direccion,
      numeroCasa,
      cuentaLuz,
      fecha,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su dirección"
        value={direccion}
        onChangeText={setDireccion}
      />

      <Text style={styles.label}>Número de casa:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de casa"
        value={numeroCasa}
        onChangeText={setNumeroCasa}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cuenta de luz:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la cuenta de luz"
        value={cuentaLuz}
        onChangeText={setCuentaLuz}
      />

      <Text style={styles.label}>Fecha:</Text>
      <Button title="Seleccionar fecha" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={onChangeFecha}
        />
      )}

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
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
});

export default Formulario;
