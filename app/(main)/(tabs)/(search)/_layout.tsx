import {Stack} from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen 
      name='index'
      options={{
        title: 'Profile',
        headerShown: false,
      }}
      />
      <Stack.Screen 
      name='user'
      options={{
        title: 'Back',
      }}
      />
    </Stack>
  )
}

export default _layout