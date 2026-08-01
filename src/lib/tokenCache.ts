

import * as SecureStore from "expo-secure-store";
import { TokenCache } from "@clerk/clerk-expo/token-cache";

export const tokenCache: TokenCache = {
  getToken: async (key) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },

  saveToken: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {}
  },
};