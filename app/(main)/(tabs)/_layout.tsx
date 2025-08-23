import {Tabs} from 'expo-router'
import {Image} from 'react-native';
import {useColorScheme} from 'react-native';

interface TabBarIconProps {
  icon: any;
  color: string;
  size: number;
}

const _layout = () => {
  const scheme= useColorScheme();
  const isDark = scheme === 'dark';

  const icons = {
  profile: require('../../../assets/profile.png'),
  feed: require('../../../assets/feed.png'),
  leaderboard: require('../../../assets/trophy.png'),
  rules: require('../../../assets/rules.png'),
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
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: isDark ? '#1A1A1A' : '#fff',
        }
      }}>
      <Tabs.Screen  
      name='index'
      options={{
        title: 'Profile',
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
        tabBarIcon: ({color, size}) => (
          <TabIcon 
            icon={icons.leaderboard} 
            color={color} 
            size={size}/>
        )
      }}/>
            <Tabs.Screen  
      name='rules'
      options={{
        title: 'rules',
        tabBarIcon: ({color, size}) => (
          <TabIcon 
            icon={icons.rules} 
            color={color} 
            size={size}/>
        )
      }}/>
    </Tabs>
    </>
  )
}

export default _layout