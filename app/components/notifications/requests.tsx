import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import { useFriends, friendsTable, } from '../../../database/context/friendsContext'
import { useEffect } from 'react'
import { Swipeable } from 'react-native-gesture-handler'
import { Pressable } from 'react-native'

export default function Requests() {
  const { friendRequests, fetchRequests, acceptRequest, deleteRequest, isLoading } = useFriends()

  useEffect(() => {
    fetchRequests()
  }, [])

  if (isLoading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />

  const { incoming, outgoing } = friendRequests

  if (incoming.length === 0 && outgoing.length === 0)
    return <Text style={styles.inactive}>No Current Friend Requests</Text>

  // const renderRightActions = (req: friendsTable) => (
  //   <Pressable style={[styles.actionBtn, { backgroundColor: 'green' }]}>
  //     <Text style={styles.actionText}>Accept</Text>
  //   </Pressable>
  // )

  const renderRightActions = (item: friendsTable) => (
    <Pressable style={[styles.actionBtn, { backgroundColor: 'red' }]} onPress={() => deleteRequest(item.id)}>
      <Text style={styles.actionText}>Delete</Text>
    </Pressable>
  )

  return (
    <View style={{ paddingTop: 2 }}>
      {incoming.length > 0 && (
        <>
          {incoming.map((item) => (
            <Swipeable
              key={item.id}
              renderRightActions={() => renderRightActions(item)}
            >
              <View style={styles.card}>
                {item.friend_profile?.avatar_url ? (
                  <Image
                    source={{ uri: item.friend_profile.avatar_url }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.imgPlaceholder} />
                )}
                <View style={styles.info}>
                  <Text style={styles.user}>{item.profiles?.user_name}</Text>
                  <Text style={styles.txt}>sent you a friend request</Text>
                  <Text style={styles.time}>10m</Text>
                </View>
                <Pressable style={styles.btn} onPress={() => acceptRequest(item.id)}>
                  <Text style={styles.btnTxt}>Accept</Text>
                </Pressable>
              </View>
            </Swipeable>
          ))}
        </>
      )}

      {outgoing.length > 0 && (
        <>
          {outgoing.map((item) => (
            <View key={item.id} style={styles.card}>
              {item.friend_profile?.avatar_url ? (
                <Image
                  source={{ uri: item.friend_profile.avatar_url }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.imgPlaceholder} />
              )}
              <View style={styles.info}>
                <Text style={styles.user}>{item.profiles?.user_name}</Text>
                <Text style={styles.txt}>Friend request sent</Text>
                <Text style={styles.time}>1h</Text>
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  inactive: {
    color: '#818589',
    marginTop: 5,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    marginLeft: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginVertical: 2,
  },
  imgPlaceholder: {
    backgroundColor: '#284B63',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginLeft: 8,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  txt: {
    marginRight: 4,
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  time: {
    color: '#636363'
  },
  btn: {
    backgroundColor: '#2EA1DD',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#2EA1DD',
    width: '19%',
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'white',
  },
})