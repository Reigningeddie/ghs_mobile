import {StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import {useRouter} from 'expo-router';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../../database/supabase';
// import type {NavProps} from '../types/types';

//Get device Width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//get specific heights
const videoBorder = screenHeight / 2.5
const thirds = screenWidth / 3 - .1;

interface userProfile {
  id: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  dom_hand: string;
}

export default function Profile(): React.JSX.Element {
  const router = useRouter();
  const {id} = useLocalSearchParams();
  const [user, setUser] = useState<userProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchData(id as string);
    }
  }, [id]);

    const fetchData = async(userId: string) => {
      try {
      setLoading(true); // Start loading

      const {data, error} = await supabase
        .from('profile')
        .select('id, user_name, dom_hand, first_name, last_name')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      // CORRECT: Set the fetched data to the user state
      if (data) {
        setUser(data);

        // Update dominant hand state based on fetched data
        if (data.dom_hand === 'right') {
          setIsRight(true);
          setIsLeft(false);
        } else if (data.dom_hand === 'left') {
          setIsRight(false);
          setIsLeft(true);
        } else {
          setIsRight(false);
          setIsLeft(false);
        }
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false); // End loading regardless of success or failure
    }
    };

  if (loading) {
    return (
      <View>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View>
        <Text>User not found.</Text>
      </View>
    );
  }

  console.log(user);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.banner} />
        <Text style={styles.txt}>
          <Pressable onPress={() => router.back()}>
            <Image source={require('../../../../assets/back.png')} style={styles.settings}/>
          </Pressable> 
          Grand Hand Slam{' '}
        </Text>
        <Pressable>
          <View style={styles.pic} >
            <Text style={styles.create}>{user?.first_name ? '' : 'create Profile'}</Text>
          </View>
        </Pressable>
        <View style={styles.dominantHand}>
          <View style={styles.left}>
            {isLeft ? (<Text style={styles.hand}>👈</Text>) : (<Text style={styles.hidden}>👈</Text>) }
            </View>
          <Text style={styles.user}>{user?.user_name ?? 'Welcome'}</Text>
          <View style={styles.right}>
            {isRight ? (<Text style={styles.hand}>👉</Text>) : (<Text style={styles.hidden}>👉</Text>)}
          </View>
        </View>
        <View style={styles.flex}>
          <View style={styles.grid}>
            <Text style={styles.num}>150</Text>
            <Text style={styles.item}>points</Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.num}>361</Text>
            <Text style={styles.item}>followers</Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.num}>253</Text>
            <Text style={styles.item}>following</Text>
          </View>
        </View>
        <Text style={styles.bio}>{user?.last_name ? '' : 'Create a profile to begin playing the game.'}</Text>
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
  contentContainer: {
    alignItems: 'center',
    width: screenWidth,
    flexGrow: 1,
  },
  banner: {
    backgroundColor: '#284B63',
    width: '100%',
    height: 120,
  },
  txt: {
    color: '#D9D9D9',
    marginTop: -120,
    fontSize: 47,
    fontWeight: 'bold',
  },
  settings: {
    height: 35,
  },
  pic: {
    backgroundColor: '#3C6E71',
    height: 150,
    width: 150,
    borderRadius: 80,
    borderColor: '#353535',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
