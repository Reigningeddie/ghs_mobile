import { StyleSheet, Text, View, Pressable, FlatList, Image, ActivityIndicator } from 'react-native';
import { useFriends, friendsTable } from '../../../database/context/friendsContext';
import { useEffect } from 'react';

export default function Requests() {
  const { friendRequests, fetchRequests, isLoading } = useFriends();
  const{ incoming, outgoing } = friendRequests

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  if (incoming.length === 0 && outgoing.length === 0)
    return <Text style={styles.inactive}>No Current Friend Requests</Text>;

  return (
    <View style={{ paddingTop: 10 }}>
      {/* Incoming Requests */}
      {incoming.length > 0 && (
        <>
          <FlatList
            data={incoming}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.friend_profile?.avatar_url ? (
                  <Image
                    source={{ uri: item.friend_profile.avatar_url }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.img} />
                )}
                <View style={styles.info}>
                  <Text style={styles.user}>{item.profiles?.user_name}</Text>
                  <Text style={styles.txt}>sent you a friend request to</Text>
                </View>
                <Pressable style={styles.btn}>
                  <Text style={styles.btnTxt}>Accept</Text>
                </Pressable>
              </View>
            )}
          />
        </>
      )}

      {/* Outgoing Requests */}
      {outgoing.length > 0 && (
        <>
          <FlatList
            data={outgoing}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.friend_profile?.avatar_url ? (
                  <Image
                    source={{ uri: item.friend_profile.avatar_url }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.img} />
                )}
                <View style={styles.info}>
                  <Text style={styles.txt}>Friend request sent to</Text>
                  <Text style={styles.user}>{item.friend_profile?.user_name}</Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inactive: {
    color: '#818589',
    marginTop: 5,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img: {
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
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '65%',
    marginLeft: 10,
  },
  user: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 4,
  },
  txt: {
    marginRight: 4,
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
});
