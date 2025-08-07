import { Stack } from 'expo-router';
import { AuthProvider } from '../database/authContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaProvider

const _layout = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider> 
        <SafeAreaView style={{ flex: 1 }}> 
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default _layout;