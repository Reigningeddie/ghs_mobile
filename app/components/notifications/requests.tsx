import { StyleSheet, Text, View, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useFriends } from '../../../database/context/friendsContext'

export default function Requests() {
  const { pendingRequests, requestsLoading, refreshRequests } = useFriends()

  /* auto-load once */
  useEffect(() => { refreshRequests() }, [])

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.user}>{item.profiles.user_name}</Text>
        <Text style={styles.txt}>Sent you a friend request</Text>
        <Text style={styles.time}>{new Date(item.created_at).toLocaleDateString()}</Text>
      </View>
      <Pressable style={styles.btn}>
        <Text style={styles.btnTxt}>Accept</Text>
      </Pressable>
    </View>
  )

  if (requestsLoading && !pendingRequests.length) {
    return <ActivityIndicator size="small" style={{ marginTop: 20 }} />
  }

  if (!pendingRequests.length) {
    return <Text style={{ color: '#818589' }}>No current friend requests</Text>
  }

  return (
    <FlatList
      data={pendingRequests}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  img: {
    backgroundColor: '#284B63',
    height: 65,
    width: 65,
    borderRadius: 50,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  user: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  txt: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#636363',
  },
  btn: {
    backgroundColor: '#2EA1DD',
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  btnTxt: {
    color: 'white',
    fontWeight: '600',
  },
})
