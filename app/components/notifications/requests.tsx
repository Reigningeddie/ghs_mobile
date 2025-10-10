import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const requests = () => {
  return (
    <View style={styles.card}>
      <View style={styles.img} />
      <View style={styles.info}>
        <Text style={styles.user}>credibowl</Text>
        <Text style={styles.txt}>Sent you a friend request </Text>
        <Text style={styles.time}>10m</Text>
      </View>
      <Pressable style={styles.btn}>
        <Text style={styles.btnTxt}>Accept</Text>
      </Pressable> 
    </View>
  )
}

export default requests

const styles = StyleSheet.create({
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