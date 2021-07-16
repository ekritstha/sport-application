import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";

const bgImage = require("../assets/background.jpg");

const Register = ({ navigation }) => {
  const [firstName, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const submitHandler = async () => {
    console.log(firstName, lastName, email, password);

    try {
      const response = await fetch("http://localhost:8000/user/register", {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const responseJson = await response.json();
      console.log(
        "🚀 ~ file: Register.js ~ line 25 ~ submitHandler ~ responseJson",
        responseJson
      );
    } catch (error) {
      console.log(error);
    }
  };

  const cancelHandler = () => {
    setName(null);
    setPassword(null);
    setEmail(null);
    setPassword(null);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} style={styles.image}>
        <Text style={styles.title}>Sport's App</Text>
        <View style={styles.form}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            placeholder={"First Name"}
            placeholderTextColor="#bbbbbb"
            keyboardType="default"
            autoCorrect={false}
            value={firstName}
            onChangeText={(text) => setName(text)}
          />

          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            placeholder={"Last Name"}
            placeholderTextColor="#bbbbbb"
            keyboardType="default"
            autoCorrect={false}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder={"Email"}
            placeholderTextColor="#bbbbbb"
            keyboardType="email-address"
            autoCorrect={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder={"Password"}
            placeholderTextColor="#bbbbbb"
            keyboardType="password"
            secureTextEntry={true}
            autoCorrect={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={submitHandler} style={styles.primaryBtn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelHandler} style={styles.SecondaryBtn}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#f04a5b",
  },

  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30,
  },

  label: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "400",
    height: 44,
    marginBottom: 30,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  primaryBtn: {
    height: 42,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 20,
  },

  SecondaryBtn: {
    height: 42,
    backgroundColor: "#f04a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 20,
  },
});

export default Register;
