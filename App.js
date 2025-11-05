import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

export default function App() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  // Función para solicitar permisos
  const checkPermissions = async () => {
    const { status: camStatus } = await Camera.requestCameraPermissionsAsync();
    const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
    setCameraPermission(camStatus);
    setLocationPermission(locStatus);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  // Función para determinar color según estado
  const getPermissionColor = (status) => {
    if (status === "granted") return styles.permitido;
    if (status === "denied") return styles.denegado;
    return styles.desconocido;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Permisos</Text>

      <Text style={styles.help}>
        Esta aplicación necesita acceder a tu cámara y ubicación para
        capturar fotos y mostrar información geográfica de forma precisa.
      </Text>

      <Text style={[styles.label, getPermissionColor(cameraPermission)]}>
        Cámara: {cameraPermission === "granted" ? "Permitido ✅" : "Denegado ❌"}
      </Text>

      <Text style={[styles.label, getPermissionColor(locationPermission)]}>
        Ubicación: {locationPermission === "granted" ? "Permitido ✅" : "Denegado ❌"}
      </Text>

      {cameraPermission === "denied" && (
        <Text style={styles.warning}>▲ Activa el permiso de cámara desde Configuración.</Text>
      )}
      {locationPermission === "denied" && (
        <Text style={styles.warning}>▲ Activa el permiso de ubicación desde Configuración.</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Verificar nuevamente permisos" onPress={checkPermissions} color="#007AFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F6F6", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  help: { fontSize: 14, textAlign: "center", marginBottom: 20, color: "#555" },
  label: { fontSize: 16, marginVertical: 5 },
  permitido: { color: "green" },
  denegado: { color: "red" },
  desconocido: { color: "gray" },
  warning: { fontSize: 13, color: "red", marginTop: 10, textAlign: "center" },
  buttonContainer: { marginTop: 20, width: "80%" },
});
