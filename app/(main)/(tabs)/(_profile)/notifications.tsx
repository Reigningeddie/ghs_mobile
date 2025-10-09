import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'

export default function Notifications(): React.JSX.Element {
  const router = useRouter();

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
          <View style={styles.card}>
              <View style={styles.img} />
              <View style={styles.info}>
                <Text style={styles.user}>credibowl</Text>
                <Text style={styles.txt}>Sent you a friend request</Text>
                <Text style={styles.time}>10m</Text>
              </View>
              <Pressable style={styles.btn}>
              <Text style={styles.btnTxt}>Accept</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleTxt}>Likes ♥️</Text>
          <View style={styles.card}>
            <View style={styles.img}/>
            <View style={styles.info}>
              <Text style={styles.user}>beerFlips</Text>
              <Text style={styles.txt}>Grand Hand Slammed</Text>
              <Text style={styles.user}>reigningeddie</Text>
              <Text style={styles.time}>5m</Text>
            </View>
            <View style={styles.post} />
          </View>
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
  post: {
    backgroundColor: 'grey',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'grey',
    width: '19%',
    height: 70
  }
});