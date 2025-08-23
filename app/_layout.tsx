import { Stack } from "expo-router";
import { AuthProvider } from "../database/authContext";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";

function LayoutInner() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const backgroundColor = isDark ? "#1A1A1A" : "#fff";

  console.log(insets.bottom)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={{ backgroundColor }} />
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
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