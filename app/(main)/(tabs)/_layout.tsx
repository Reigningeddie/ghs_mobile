import {Tabs} from 'expo-router'
import {Image} from 'react-native';
import {StatusBar} from 'expo-status-bar'

interface TabBarIconProps {
  icon: any;
  color: string;
  size: number;
}

const _layout = () => {
  const icons = {
  profile: require('../../../assets/profile.png'),
  feed: require('../../../assets/feed.png'),
  leaderboard: require('../../../assets/trophy.png'),
  } ;

  const TabIcon = ({icon, color, size}: TabBarIconProps)  => {
    return (
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{width: size, height: size}}
        />
    );
  }
  return (
    <>
    <StatusBar style="auto" />
    <Tabs>
      <Tabs.Screen  
      name='index'
      options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <TabIcon 
            icon={icons.profile} 
            color={color} 
            size={size}/>
        )
        }}/>
      <Tabs.Screen  
      name='feed'
      options={{
        title: 'feed',
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <TabIcon 
            icon={icons.feed} 
            color={color} 
            size={size}/>
        )
      }}/>
      <Tabs.Screen  
      name='leaderboard'
      options={{
        title: 'leaderboard',
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <TabIcon 
            icon={icons.leaderboard} 
            color={color} 
            size={size}/>
        )
      }}/>
    </Tabs>
    </>


  )
}

export default _layout