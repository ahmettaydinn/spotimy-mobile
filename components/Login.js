import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      if (usersData !== null) {
        setUsers(JSON.parse(usersData))
      }
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      Alert.alert("Success", `Welcome, ${user.email}!`);

      navigation.navigate('Songs');
    } else {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MusicApp</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput 
          style={styles.input} 
          placeholder="E-mail"
          keyboardType="email-address" 
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button title="Login" onPress={handleLogin} />
      <StatusBar style="auto" />
      <View>
        <Text>Not registered? Register <Text style={styles.register} onPress={() => navigation.navigate('Register')} >here!</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    width: '80%', 
    marginBottom: 16, 
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 4,
    width: '100%', 
  },
  register: {
    color: "blue"
  }
});