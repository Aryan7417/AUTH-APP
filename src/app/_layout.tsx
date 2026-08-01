import { ClerkProvider } from "@clerk/clerk-expo"
import { Stack } from "expo-router"
import { Tokencat } from "../lib/tokenCache"

export default function ROOtlayout() {
  return (
    <ClerkProvider
      tokenCache={Tokencat}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Stack screenOptions={{headerShown:false}} />
    </ClerkProvider>
  )

}

