import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { useRouter } from 'expo-router'

const notifications = () => {
  const router = useRouter();

  function back() {
  
    router.back()
    console.log('back')
  }

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.pressable}>
          <Image source={require('../../../../assets/back.png')} />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
      <Text>notifications</Text>
    </View>
  )
}

export default notifications

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
  }
})