import {Stack} from 'expo-router'
import {AuthProvider} from '../database/authContext'
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';


const _layout = () => {

  return (
    <AuthProvider>
      <View style={{height: 50, backgroundColor: 'red'}} />
      <StatusBar style="auto" />
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