import * as SecureStore from "expo-secure-store";

async function saveSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function saveAccessToken(accessToken: string) {
  await saveSecureStore("accessToken", accessToken);
}

export async function getAccessToken() {
  const accessToken = (await SecureStore.getItemAsync("accessToken")) ?? null;
  return accessToken;
}

export async function deleteAccessToken() {
  await SecureStore.deleteItemAsync("accessToken");
}
