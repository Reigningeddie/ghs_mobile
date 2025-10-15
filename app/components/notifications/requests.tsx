import { StyleSheet, Text, View, Pressable, FlatList, Image, ActivityIndicator } from 'react-native'
import { useFriends } from '../../../database/context/friendsContext'
import { useEffect } from 'react'


export default function Requests() {
  const { friendRequests, fetchRequests, isLoading} = useFriends()

  useEffect(() => {
    fetchRequests()
  }, [])

  if (isLoading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />

  const pending = friendRequests.filter((req) => req.status === 'pending')

  if (pending.length === 0)
    return <Text style={styles.inactive}>No Current Friend Requests</Text>

  return (
    <FlatList
      data={pending}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.friend_profile?. avatar_url ? (
            <Image
              source={{ uri: item.friend_profile.avatar_url }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />): (
              <View style={styles.img} />
            )}
          <View style={styles.info}>
            <Text style={styles.user}>
            {item.profiles?.user_name}
          </Text>
          <Text style={styles.txt}>
            sent you a friend request
          </Text>
          <Text style={styles.time}>10m</Text>
          
          </View>
          <Pressable style={styles.btn}>
            <Text style={styles.btnTxt}>Accept</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inactive: {
    color: "#818589",
    marginTop: 5
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    backgroundColor: '#284B63',
    height: 65,
    width: 65,
    borderRadius: 50
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '65%',
  },
  user: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 4,
  },
  txt: {
    marginRight: 4,
  },
  time: {
    color: '#636363',
  },
  btn: {
    backgroundColor: '#2EA1DD',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#2EA1DD',
    width: '19%',
    height: 26,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTxt: {
    color: 'white',
  },
})