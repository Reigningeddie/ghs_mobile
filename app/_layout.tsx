import { Stack } from 'expo-router';
import { AuthProvider } from '../database/authContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const _layout = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider> 
        <SafeAreaView style={{ flex: 1 }}> 
          <StatusBar style="dark" />
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