import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native"; 

const auth = getAuth();

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name is too short!")
    .max(50, "First Name is too long!")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Last Name is too short!")
    .max(50, "Last Name is too long!")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const MyForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth status
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(""); // Track error message
  const navigation = useNavigation(); 

  useEffect(() => {
    // Firebase Authentication state değişikliklerini izleyin
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // Kullanıcı giriş yaptı
        navigation.navigate("Home"); // Giriş yaptıktan sonra ana sayfaya yönlendirin
      } else {
        setIsAuthenticated(false); // Kullanıcı çıkış yaptı
      }
    });

    return unsubscribe; // Temizleme işlemi
  }, [navigation]);

  const onSubmit = async (values) => {
    setIsLoading(true); // Start loading
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error.code, error.message);
      setErrorMessage(error.message); // Set error message
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleLogin = async (values) => {
    setIsLoading(true); // Start loading
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log(user);
      setIsAuthenticated(true);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error.code, error.message);
      setErrorMessage(error.message); // Set error message
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <View>
      <Formik
        initialValues={
          isRegister
            ? {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }
            : { email: "", password: "" }
        }
        validationSchema={isRegister ? RegisterSchema : LoginSchema}
        onSubmit={(values) => {
          isRegister ? onSubmit(values) : handleLogin(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            {isRegister && (
              <>
                <Text>First Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  placeholder="First Name"
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.error}>{errors.firstName}</Text>
                )}

                <Text>Last Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  placeholder="Last Name"
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.error}>{errors.lastName}</Text>
                )}
              </>
            )}

            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="E-posta adresinizi girin"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text>Şifre</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Şifrenizi girin"
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {isRegister && (
              <>
                <Text>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  secureTextEntry
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </>
            )}

            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Button onPress={handleSubmit} title="Gönder" />
            )}

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <TouchableOpacity
              onPress={() => setIsRegister(!isRegister)}
              style={styles.switchButton}
            >
              <Text style={styles.switchText}>
                Switch to {isRegister ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  switchButton: {
    marginTop: 10,
    alignItems: "center",
  },
  switchText: {
    color: "blue",
  },
});

export default MyForm;
