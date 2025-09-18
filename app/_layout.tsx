import { Stack } from "expo-router";
import { AuthProvider } from "../database/authContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
    <AuthProvider>
      <SafeAreaProvider>
        <LayoutInner />
      </SafeAreaProvider>
    </AuthProvider>
  );
}