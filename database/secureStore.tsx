import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as aesjs from 'aes-js';
import 'react-native-get-random-values';

class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
    const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
    
    await AsyncStorage.setItem(key, aesjs.utils.hex.fromBytes(encryptedBytes));
    await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));
  }

  private async _decrypt(key: string) {
    const encryptedBytesHex = await AsyncStorage.getItem(key);
    const encryptionKeyHex = await SecureStore.getItemAsync(key);

    if (encryptedBytesHex === null || encryptionKeyHex === null) {
      return null;
    }

    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedBytesHex);
    const encryptionKey = aesjs.utils.hex.toBytes(encryptionKeyHex);
    
    const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
    const decryptedBytes = cipher.decrypt(encryptedBytes);
    
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    try {
      return await this._decrypt(key);
    } catch {
      return null;
    }
  }

  async setItem(key: string, value: string) {
    try {
      return await this._encrypt(key, value);
    } catch (error) {
      console.error('Failed to set item in SecureStore:', error);
    }
  }

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
    await SecureStore.deleteItemAsync(key);
  }
}

export const SecureStoreAdapter = new LargeSecureStore();