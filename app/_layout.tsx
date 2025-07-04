// import { Stack } from 'expo-router'
import {Stack} from 'expo-router'
import {AuthProvider} from '../database/authContext'

const _layout = () => {

  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown: false,}}>
        <Stack.Screen
        name="(auth)"
        options={{ 
          headerShown:false,
        }}
      />
              <Stack.Screen
        name="(main)"
        options={{ 
          headerShown:false,
        }}
      />
    </Stack>
    </AuthProvider>
  )
}

export default _layout