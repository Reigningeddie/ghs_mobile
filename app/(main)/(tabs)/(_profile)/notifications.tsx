import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import Requests from '../../../components/notifications/requests'
import Likes from '../../../components/notifications/likes'

export default function Notifications(): React.JSX.Element {
  const router = useRouter();
  const [requests, setRequests] = useState<boolean>(false);
  const [likes, setLikes] = useState<boolean>(false);


  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.pressable}>
          <Image source={require('../../../../assets/back.png')} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.borderContent}>
        <View style={styles.section}>
          <Text style={styles.titleTxt}>Friend Requests</Text>
          {requests ? <Requests /> : <Text style={styles.inactive}>No Current Friend Requests</Text> } 
        </View>
        <View style={styles.section}>
          <Text style={styles.titleTxt}>Likes ♥️</Text>
          {likes ? <Likes /> : <Text style={styles.inactive}>No Current Likes</Text> }
        </View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  header: {
    backgroundColor: '#284B63',
    width: '100%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row'

  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 18
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginLeft: 25
  },
  borderContent: {
    padding: 20,
    flexGrow: 1,
  },
  section: {
    flexDirection: 'column',
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  inactive: {
    color: '#818589',
  },
});