import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native';

export default function Register({navigation}) {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [users, setUsers] = useState([])

    const saveData = async () => {
        try {
           const newUser = { fullName: fullName, email: email, password: password };

          setUsers((prev) => [...prev, newUser])
            await AsyncStorage.setItem('users', JSON.stringify(users));
            Alert.alert('Data saved successfully!');
            console.log(users);
          setFullName(""); 
          setEmail(""); 
          setPassword("")
          Alert.alert(JSON.stringify(users))
          console.log(users)
        } catch (error) {
          Alert.alert('Failed to save data', error.message);
        }
      }

  return (
    <View style={registerStyles.container}>
      <Text style={registerStyles.title}>MusicApp</Text>

      <View style={registerStyles.inputContainer}>
        <Text style={registerStyles.label}>Full Name</Text>
        <TextInput 
          style={registerStyles.input} 
          placeholder="Full Name"
          keyboardType="name" 
          autoCapitalize="none"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={registerStyles.inputContainer}>
        <Text style={registerStyles.label}>E-mail</Text>
        <TextInput 
          style={registerStyles.input} 
          placeholder="E-mail"
          keyboardType="email-address" 
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={registerStyles.inputContainer}>
        <Text style={registerStyles.label}>Password</Text>
        <TextInput 
          style={registerStyles.input} 
          placeholder="Password" 
          secureTextEntry 
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button title="Register" onPress={saveData} />
      <StatusBar style="auto" />

      <View>
        <Text>Already registered? Login <Text style={registerStyles.register} onPress={() => navigation.navigate('Login')} >here!</Text></Text>
      </View>
    </View>
  )
}

const registerStyles = StyleSheet.create({
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
})