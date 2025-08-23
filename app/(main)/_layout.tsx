import {Stack} from 'expo-router'

const BottomTabs = () => {
  return (
    <>
    <Stack>
      <Stack.Screen  
      name='(tabs)'
      options={{
        title: 'Bottom Tabs',
        headerShown: false,
      }}/>
    </Stack>
    </>


  )
}

export default BottomTabs