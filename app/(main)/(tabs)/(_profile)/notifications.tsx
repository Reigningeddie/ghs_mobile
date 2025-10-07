import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { useRouter } from 'expo-router'

export default function Notifications(): React.JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.pressable}>
          <Image source={require('../../../../assets/back.png')} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
      <Text style={styles.title}>Notifications</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    backgroundColor: '#284B63',
    width: '100%',
    height: 60,
    justifyContent: 'center'

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
    fontSize: 30,
    textAlign: 'center'
  }
});