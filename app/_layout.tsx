import { Stack } from 'expo-router'
import {AuthProvider} from '../database/authContext'

const _layout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
        name="index"
        options={{ 
          headerShown:false,
        }}
      />
    </Stack>
    </AuthProvider>

  )
}

export default _layout