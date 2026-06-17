import * as SecureStore from "expo-secure-store";

async function saveSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function saveAccessToken(accessToken: string) {
  return saveSecureStore("accessToken", accessToken);
}

export async function getAccessToken() {
  const accessToken = (await SecureStore.getItemAsync("accessToken")) ?? null;
  return accessToken;
}

export async function deleteAccessToken() {
  await SecureStore.deleteItemAsync("accessToken");
}

export async function saveDeviceLanguage(language: string) {
  return saveSecureStore("language", language);
}

export async function getSavedDeviceLanguage() {
  const language = await SecureStore.getItemAsync("language");
  return language;
}
