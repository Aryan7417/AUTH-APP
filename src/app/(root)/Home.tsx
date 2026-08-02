import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { SignedOut } from "@clerk/clerk-expo";

export default function Home() {
  const { signOut } = useAuth()

  const onLogout = async () => {
    await signOut()
    router.replace('/(auth)/login')
  }




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      <Text style={styles.subtitle}>
        You have successfully logged in.
      </Text>

      <TouchableOpacity

        style={styles.logoutButton}
        onPress={onLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 40,
  },

  logoutButton: {
    width: "100%",
    backgroundColor: "#EF4444",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});