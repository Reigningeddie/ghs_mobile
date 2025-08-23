import {StyleSheet, Text, View, ScrollView, Pressable, Image} from 'react-native';
import {useRouter} from 'expo-router';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {useAuth} from '../../../database/authContext';
// import type {NavProps} from '../types/types';

//Get device Width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
//get specific heights
const videoBorder = screenHeight / 2.5
const thirds = screenWidth / 3 - .1;

const router = useRouter();

export default function Profile(): React.JSX.Element {
  const {logout, profile} = useAuth();

  // useEffect(() => {
  //   console.log(profile);
  // }, [profile]);

  function handleLogout() {
    logout();
    router.replace('/(auth)')
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.banner} />
        <Text style={styles.txt}>
          Grand Hand Slam{' '}
          <Pressable onPress={() => handleLogout()}>
            <View>
              <Image source={require('../../../assets/settings.png')} style={styles.settings}/>
            </View>
          </Pressable>
        </Text>
        <Pressable >
          <View style={styles.pic} >
            <Text style={styles.create}>{profile?.first_name ? '' : 'create Profile'}</Text>
          </View>
        </Pressable>
        <Text style={styles.user}>{profile?.user_name ?? 'Welcome'}</Text>
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
        <Text style={styles.bio}>{profile?.last_name ? '' : 'Create a profile to begin playing the game.'}</Text>
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
