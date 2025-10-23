import { Stack } from "expo-router";
import { AppProvider } from "../database/appProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";

function LayoutInner() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const backgroundColor = isDark ? "#1A1A1A" : "#fff";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={{ backgroundColor }} />
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(main)" />
      </Stack>
    </SafeAreaView>
  ); 
}

export default function Layout() {
  return (
    <AppProvider>
      <GestureHandlerRootView>
        <SafeAreaProvider>
        <LayoutInner />
      </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppProvider>
  );
}