import {View, Text, StyleSheet, Image} from 'react-native';

const photoWidth = '25%'

const Feed = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.activity}>All Activity</Text>
      <View style={styles.dividerView}>
        <View style={styles.sides}/>
        <View style={styles.divider}/>
        <View style={styles.sides}/>
      </View>
      <View style={styles.card}>
        <View style={styles.vsView}>
          <View style={styles.player} />
          <View style={styles.gshText}>
            <Text style={styles.gsh}>Grand Hand</Text>
            <Text style={styles.gsh}>Slammed</Text>
            <Text style={styles.time}>@12:00pm</Text>
          </View>
          <View style={styles.oponent} />
        </View>
        <View style={styles.nameArea}>
          <Text style={styles.name}>ReigningEddie</Text>
          <Text style={styles.opponentName}>BeerFlips</Text>
        </View>
          <View style={styles.captionArea}>
            <Text style={styles.caption}>"Add Caption Here."</Text>
          </View>
          <View style={styles.likesArea}>
          <Image source={require('../../../../assets/likeActive.png')} />
          <Text style={styles.likes}>5</Text>
        </View>
        <View style={styles.commentArea}>
          <Image source={require('../../../../assets/comments.png')} />
          <Text style={styles.comment}>12</Text>
        </View>
      </View>
    </View>
  );
}

export default Feed;

const styles = StyleSheet.create({

  body: {
    alignItems: 'center',
    marginTop: 10
  },
  activity: {
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: "black"
  },
  dividerView: {
    flexDirection: 'row',
    width: '100%'

  },
  divider: {
    borderColor: 'black',
    borderWidth: .8,
    alignSelf: 'stretch',
    width: '80%',
    marginTop: 10,
  },
  sides: {
    width: '10%',
  },
  card: {
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    height: 'auto',
    width: '97%',
    backgroundColor: '#284B63'
  },
  vsView: {
    flexDirection: 'row',
  },
  player: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: .5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 5,
    height: 120,
    width: photoWidth
  },
//* this is just spacing betwen picture and text

  gshText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  gsh: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white'
  },
  oponent: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: .5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderRadius: 5,
    height: 120,
    width: photoWidth
  },
  nameArea: {
    flexDirection: 'row',
  },
  name: {
    color: 'white',
    width: '48%',
    fontSize: 15,
    marginLeft: 3
  },
  opponentName: {
    color: 'white',
    width: '50%',
    textAlign: 'right',
    fontSize: 15,
  },
  time: {
    fontSize: 13,
    color: 'white'
  },
  captionArea: {
    alignItems: 'center',
  },
  caption: {
    color: 'white',
    fontSize: 17
  },
  likesArea: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  likes: {
    marginLeft: 2,
    color: 'white'
  },
  commentArea: {
    margin: 5,
    flexDirection: 'row',
  },
  commentLogo: {},
  comment: {
    marginLeft: 2,
    color: 'white'
  },
});