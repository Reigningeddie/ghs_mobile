import {StyleSheet, Text, View, ScrollView, Pressable, Image, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {Dimensions} from 'react-native';
import {useEffect, useState, useCallback} from 'react';
import {useAuth} from '../../../../database/context/authContext';
import {useProfile} from '../../../../database/context/profileContext';
import { useFocusEffect } from '@react-navigation/native';
import {getFollowersAndFollowing} from '../../../../database/services/friendService'
// import type {NavProps} from '../types/types';

//Get device Width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//get specific heights
const videoBorder = screenHeight / 2.5
const thirds = screenWidth / 3 - .1;

export default function Profile(): React.JSX.Element {
  const router = useRouter();
  const { logout, authUser } = useAuth();
  const { profile, isProfileComplete } = useProfile();
  const [active] = useState<boolean>(false)
  const { fetchProfile } = useProfile();
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);

  // reloads profile on focus
  useFocusEffect(
    useCallback(() => {
      fetchProfile(authUser.id);
      fetchFollowersAndFollowing(authUser.id);
    }, [])
  );

  const fetchFollowersAndFollowing = async (userId: string) => {
  try {
    const { followersCount, followingCount } = await getFollowersAndFollowing(userId);
    setFollowers(followersCount || 0);
    setFollowing(followingCount || 0);
  } catch (err) {
    console.error('Error fetching followers/following:', err);
  }
};

  function handleLogout() {
    logout();
    router.replace('/(auth)')
  };

  useEffect(() => {
    if (profile && !isProfileComplete) {
      Alert.alert(
        "Welcome to GRAND HAND SLAM!",
        'Please complete your profile to start playing.',
        [
          {
            text: 'Later',
            style: 'cancel',
          },
          {
            text: 'Complete Now',
            onPress: () => router.push('edit'),
            style: 'default',
          },
        ]
      );
    }
  }, [profile, isProfileComplete, router]);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.containerContent}>
        <View style={styles.banner} >
          <View style={styles.txtContainer}>
          <Text style={styles.txt}>Grand Hand Slam</Text>
          <Pressable onPress={() => handleLogout()} >
            <Image source={require('../../../../assets/settings.png')} style={styles.settings}/>
          </Pressable> 
        </View>
        </View>
        
        <Pressable onPress={() => router.push('/edit')} >
          <View style={styles.pic} >
            <Text style={styles.create}>{profile?.user_name ? '' : 'create Profile'}</Text>
          </View>
        </Pressable>
        <View style={styles.dominantHand}>
          <View style={styles.left}>
            {profile?.dom_hand === 'left' ? (<Text style={styles.hand}>👈</Text>) : (<Text style={styles.hidden}>👈</Text>)}
            </View>
          <Text style={styles.user}>{profile?.user_name ?? 'Welcome'}</Text>
          <View style={styles.right}>
            {profile?.dom_hand === 'right' ? (<Text style={styles.hand}>👉</Text>) : (<Text style={styles.hidden}>👉</Text>)}
          </View>
        </View>
        <View style={styles.flex}>
          <View style={styles.grid}>
            <Text style={styles.num}>{profile?.points}</Text>
            <Text style={styles.item}>points</Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.num}>{followers}</Text>
            <Text style={styles.item}>followers</Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.num}>{following}</Text>
            <Text style={styles.item}>following</Text>
          </View>
        </View>
        <View style={styles.btns}>
          <Pressable style={[styles.btnBorders, active && styles.active]} onPress={() => router.push('/notifications')}>
            {active ? <Image source={require('../../../../assets/notificationActive.png')} /> :
            <Image source={require('../../../../assets/notification.png')} />}
            <Text style={[styles.notificationTxt, active && styles.active]}>notifications</Text>
          </Pressable>
        </View>
        <Text style={styles.bio}>{profile?.user_name ? '' : 'Create a profile to begin playing the game.' }</Text>
        <View style={styles.vBorder}>
          <View style={styles.portrait}>
            <Text style={styles.vids}> 4</Text>
            <Text style={styles.vids}> 3</Text>
            <Text style={styles.vids}> 2</Text>
            <Text style={styles.vids}> 1</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerContent: {
    alignItems: 'center',
    width: screenWidth,
    flexGrow: 1,
  },
  banner: {
    backgroundColor: '#284B63',
    width: '100%',
    height: 120,
  },
  txtContainer: {
    flexDirection: 'row',
    width: '99%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txt: {
    color: '#D9D9D9',
    fontSize: 45,
    fontWeight: 'bold',
  },
  settings: {
    height: 35
  },
  pic: {
    backgroundColor: '#3C6E71',
    height: 150,
    marginTop: -50,
    width: 150,
    borderRadius: 80,
    borderColor: '#353535',
    borderWidth: 5,
  },
  create: {
    color: 'black',
    fontSize: 20,
  },
  dominantHand: {
    flexDirection: 'row',
  },
  left: {
    // transform: [{ rotate: '60deg' }],
  },
  hand: {
    fontSize: 50,
  },
  hidden: {
    opacity: 0,
    fontSize: 50,
  },
  right: {
    // transform: [{ rotate: '-60deg' }],
  },
  user: {
    color: '#3C6E71',
    marginTop: 10,
    fontSize: 32,
    fontWeight: 'bold',
  },
  flex: {
    flexDirection: 'row',
  },
  grid: {
    alignItems: 'center',
    padding: 10,
  },
  num: {
    color: '#353535',
    fontSize: 25,
    fontWeight: 'bold',
  },
  item: {
    color: '#353535',
    fontSize: 22,
  },
  btns: {
    flexDirection: 'row'
  },
  btnBorders: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    height: 40,
    width: 125,
  },
  notificationTxt: {
    fontSize: 12,
  },
  active: {
    backgroundColor: 'black',
    color: 'white'
  },
  bio: {
    color: '#353535',
    fontSize: 20,
    marginBottom: 25,
  },
  vBorder: {
    backgroundColor: '#284B63',
    minHeight: videoBorder,
    width: '100%',
  },
  portrait: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%'
  },
  vids: {
    backgroundColor: 'grey',
    borderWidth: 1,
    borderColor: '#284B63',
    width: thirds,
    height: 200,
  },
});