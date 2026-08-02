import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";




export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter()

  // const onSignUpPress = async () => {
  //   if (!isLoaded) return

  //   try {
  //     await signUp.create({
  //       emailAddress: email,
  //       password,
  //     })
  //     await signUp.prepareEmailAddressVerification({
  //       strategy: 'email_code'
  //     })
  //     router.push("/(auth)/Verify")

  //   } catch (err: any) {
  //     console.log(JSON.stringify(err, null, 2))
  //     Alert.alert(
  //   "Signup Failed",
  //   err.errors?.[0]?.longMessage || "Something went wrong"
  // );

  //   }
  //   console.log("Button pressed")


  // }



  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      console.log("Creating account...");

      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      console.log("Account Created:", result);

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      console.log("OTP Sent");

      router.push("/(auth)/Verify");
    } catch (err: any) {
      console.log("Signup Error");
      console.log(JSON.stringify(err, null, 2));

      Alert.alert(
        "Signup Failed",
        err.errors?.[0]?.longMessage || "Something went wrong"
      );
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account 🚀</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}
        onPress={onSignUpPress}

      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>

        <Link href="/(auth)/login" style={styles.link}>
          Login
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "gray",
    marginBottom: 30,
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  link: {
    color: "#4F46E5",
    fontWeight: "bold",
  },
});