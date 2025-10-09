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
        <View style={styles.horizon}>
          <Text style={styles.txt}>Friend Requests</Text>
        </View>
        <Text style={styles.txt}>Grand Hand Slams</Text>
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
  horizon: {
    
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});