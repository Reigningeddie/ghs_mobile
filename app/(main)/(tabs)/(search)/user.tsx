import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useGame } from "../../../../database/context/gameContext";
import { useFriends } from "../../../../database/context/friendsContext";
import { useProfile } from "../../../../database/context/profileContext";
import { useTarget } from "../../../../database/context/targetContext";

// Get device dimensions
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
//get specific heights
const videoBorder = screenHeight / 2.5
const thirds = screenWidth / 3 - .1;

export default function UserProfile() {
  const router = useRouter();
  const { id: userId } = useLocalSearchParams<{ id: string }>();
  const { targetUser, fetchUser } = useTarget(); 
  const { addPoints } = useGame();
  const { addFriend } = useFriends();
  const { profile, isProfileComplete, isLoading, error } = useProfile();

  // Fetch the target user's profile when id changes
  useEffect(() => {
    if (userId) {
      fetchUser(userId)
    }
  }, [userId]);

  const handleScore = async () => {
    if (!profile?.id || !targetUser) return;

    if (!isProfileComplete) {
      Alert.alert(
        "🎯 Complete Your Profile First",
        "You need to complete your profile before earning points!\n\nRequired:\n• Username (6+ characters)\n• First Name\n• Dominant Hand",
        [
          { text: "Later", style: "cancel" },
          {
            text: "Complete Profile",
            onPress: () => router.push("/(main)/(tabs)/(_profile)/edit"),
          },
        ]
      );
      return;
    }

    const { data, error } = await addPoints(10);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "🎉 Grand Hand Slam!",
        `You just Grand Hand Slammed ${
          targetUser.user_name || "a player"
        } and earned 10 points!`
      );
    }
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error loading profile: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.banner} />
        <View style={styles.txtContainer}>
          <Pressable onPress={() => router.back()} style={styles.icons}>
            <Image source={require('../../../../assets/back.png')}/>
          </Pressable> 
          <Text style={styles.txt}>Grand Hand Slam</Text> 
          <Pressable style={styles.icons} onPress={addFriend}>
            <Image source={require('../../../../assets/addFriend.png')} style={styles.addFriend} />
          </Pressable>
        </View>
        <Pressable onPress={handleScore}>
          <View style={styles.pic} >
            <Text style={styles.create}>{targetUser?.first_name ? '' : 'create Profile'}</Text>
          </View>
        </Pressable>
        <View style={styles.dominantHand}>
          <View style={styles.left}>
            {targetUser?.dom_hand === 'left' ? (<Text style={styles.hand}>👈</Text>) : (<Text style={styles.hidden}>👈</Text>) }
            </View>
          <Text style={styles.user}>{targetUser?.user_name ?? 'Welcome'}</Text>
          <View style={styles.right}>
            {targetUser?.dom_hand === 'right' ? (<Text style={styles.hand}>👉</Text>) : (<Text style={styles.hidden}>👉</Text>)}
          </View>
        </View>
        <View style={styles.flex}>
          <View style={styles.grid}>
            <Text style={styles.num}>{targetUser?.points}</Text>
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
        <Text style={styles.bio}>{targetUser?.last_name ? '' : 'Create a profile to begin playing the game.'}</Text>
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
  txtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -120,
    marginBottom: 10,
    marginLeft: -10,
    width: '105%'
  },
  icons: {
    height: 4,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#D9D9D9',

  },
  addFriend: {
    height: 25,
    width: 25,
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
