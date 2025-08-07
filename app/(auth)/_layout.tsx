import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const _layout = () => {
  return (
    <>
    <StatusBar style="auto" />
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,

        }}
      />
    </Stack>
    </>
  )
}

export default _layout