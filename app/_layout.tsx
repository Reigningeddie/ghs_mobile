import { Stack } from 'expo-router'



const _layout = () => {
console.log(process.env.EXPO_PUBLIC_SUPABASE_URL); 
console.log(process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

  return (
      <Stack>
        <Stack.Screen
        name="index"
        options={{ 
          headerShown:false,
        }}
      />
    </Stack>
  )
}

export default _layout