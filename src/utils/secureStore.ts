import * as SecureStore from 'expo-secure-store'

export async function secureStoreSave(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

export async function getSecureStoreValue(key: string) {
  return await SecureStore.getItemAsync(key)
}

export async function deleteSecureStoreValue(key: string) {
  await SecureStore.deleteItemAsync(key)
}
