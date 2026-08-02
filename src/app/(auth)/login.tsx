import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";




import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // const onSignUpPress = async () => {
  //   if (!isLoaded) return;

  //   try {
  //     await signUp.create({
  //       emailAddress: email,
  //       password,
  //     });

  //     await signUp.prepareEmailAddressVerification({
  //       strategy: "email_code",
  //     });

  //     router.push("/(root)/Home");
  //   } catch (err: any) {
  //     console.log(JSON.stringify(err, null, 2));
  //   }
  // };


  const onLoginPress = async () => {

    console.log("Email:", `"${email}"`);
    console.log("Password:", `"${password}"`);
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        router.replace("/(root)/Home");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
    const result = await signIn.create({
      identifier: email.trim().toLowerCase(),
      password: password,
    });

    console.log("Login Result:", JSON.stringify(result, null, 2));
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

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

      <TouchableOpacity
        onPress={onLoginPress}
        style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Don't have an account? </Text>

        <Link href="/(auth)/signUp" style={styles.link}>
          Sign Up
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