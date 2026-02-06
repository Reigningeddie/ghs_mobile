import { StyleSheet, Text, View, Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const Challenges = () => {

  const translateX = useSharedValue(0)
  const threshold = 120
  const onAccept = () => {
    console.log('Challenge Accepted!')
  }

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 0) { 
        translateX.value = event.translationX
      }
    })
    .onEnd(() => {
      if (translateX.value > threshold) {
        onAccept()
      }
      translateX.value = withSpring(0) // snap back
    })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.card}>
      <View style={styles.img}></View>
      <View style={styles.info}>
        <Text style={styles.user}>credibowl</Text>
        <Text style={styles.txt}>Extended a challange</Text>
        <Text style={styles.time}>5m ago</Text>
      </View>
      <Pressable style={styles.btn}>
        <Text style={styles.btnTxt}>Use Mulligan</Text>
      </Pressable>
    </View>
    </GestureDetector>
  )
}

export default Challenges

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5
  },
  img: {
    backgroundColor: '#284B63',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '65%',
    marginLeft: 8
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
    justifyContent: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: 13
  },
})