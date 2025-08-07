import {Tabs} from 'expo-router'
import {StatusBar} from 'expo-status-bar'

const _layout = () => {
  return (
    <>
    <StatusBar style="auto" />
    <Tabs>
      <Tabs.Screen  
      name='index'
      options={{
        title: 'Profile',
        headerShown: false,
      }}/>
      <Tabs.Screen  
      name='leaderboard'
      options={{
        title: 'leaderboard',
        headerShown: false,
      }}/>
    </Tabs>
    </>


  )
}

export default _layout