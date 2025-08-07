import {Stack} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const BottomTabs = () => {
  return (
    <>
    <StatusBar style="auto" />
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