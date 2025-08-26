import {Stack} from 'expo-router'

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
      name='index'
      options={{
        title: 'Profile',
      }}
      />
      <Stack.Screen 
      name='edit'
      options={{
        title: 'Edit Profile',
      }}
      />
    </Stack>
  )
}

export default _layout