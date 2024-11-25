import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [nroMedidor, setNroMedidor] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarDatos = async () => {
    if (!nombre || !rut || !direccion || !telefono || !email || !nroMedidor) {
      setMensaje('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await axios.post(
        'http://10.28.34.41/mi_formulario/insertar.php',
        {
          nombre,
          rut,
          direccion,
          telefono,
          email,
          nro_medidor: nroMedidor,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data) {
        setMensaje('Datos enviados exitosamente.');
      } else {
        setMensaje('Hubo un problema al procesar la respuesta.');
      }
    } catch (error) {
      setMensaje('Hubo un error al enviar los datos.');
      console.error("Error de solicitud:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Formulario de datos clientes - ADMIN Electrica</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="RUT"
        value={rut}
        onChangeText={setRut}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de medidor"
        keyboardType="numeric"
        value={nroMedidor}
        onChangeText={setNroMedidor}
      />
      <Button title="Enviar" onPress={enviarDatos} />
      {mensaje && <Text style={styles.mensaje}>{mensaje}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  mensaje: {
    marginTop: 20,
    fontSize: 16,
    color: 'black', 
    textAlign: 'center',
  },
});

export default Formulario;
