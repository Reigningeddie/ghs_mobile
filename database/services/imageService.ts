// database/services/imageService.ts
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform, ActionSheetIOS } from 'react-native';

export interface ImageResult {
  uri: string;
}

/**
 * Opens a system action sheet (iOS/Android) to let user pick camera or gallery.
 * Returns { uri } or null if cancelled.
 */
export const pickImage = async (): Promise<ImageResult | null> => {
  if (Platform.OS === 'ios') {
    return new Promise((resolve) => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Gallery'],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) resolve(await pickFromCamera());
          else if (buttonIndex === 2) resolve(await pickFromGallery());
          else resolve(null);
        }
      );
    });
  } else {
    return new Promise((resolve) => {
      Alert.alert(
        'Select Image',
        'Choose an option:',
        [
          { text: 'Camera', onPress: async () => resolve(await pickFromCamera()) },
          { text: 'Gallery', onPress: async () => resolve(await pickFromGallery()) },
          { text: 'Cancel', style: 'cancel', onPress: () => resolve(null) },
        ],
        { cancelable: true }
      );
    });
  }
};

const pickFromCamera = async (): Promise<ImageResult | null> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Camera permission is required.');
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.6,
  });

  if (result.canceled) return null;
  return { uri: result.assets[0].uri };
};

const pickFromGallery = async (): Promise<ImageResult | null> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Gallery permission is required.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.6,
  });

  if (result.canceled) return null;
  return { uri: result.assets[0].uri };
};
