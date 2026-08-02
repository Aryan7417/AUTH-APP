import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


export default function Verify() {
  const [code, setCode] = useState("");
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const onVerifyPress = async () => {

    
    if (!isLoaded) return

    try {
      const complteSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })
      console.log("Status:", complteSignUp.status);
      console.log("Session:", complteSignUp.createdSessionId);
      if (complteSignUp.status === "complete") {
        await setActive({ session: complteSignUp.createdSessionId })

       router.push("/(root)/Home");
      } else {
        console.log(("Verification not complted"))
      }
      

    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2))

    }

    



  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email 📩</Text>

      <Text style={styles.subtitle}>
        Enter the verification code sent to your email.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onVerifyPress}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
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
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});