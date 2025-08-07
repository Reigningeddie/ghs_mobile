import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';

//Get device Width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const divHeight = screenHeight / 10;
const div = screenWidth - 25;
const info = screenWidth / 2.5;

export default function UnderThree(): React.JSX.Element {
  return (
    <View style={styles.body}>
      <Text style={styles.txt}>Friends</Text>
      <View style={styles.div}>
        <View style={styles.pic} />
        <View style={styles.info}>
          <Text style={styles.name}>name</Text>
          <Text style={styles.points}>190pts</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.place}>4</Text>
        </View>
      </View>
      <View style={styles.div}>
        <View style={styles.pic} />
        <View style={styles.info}>
          <Text style={styles.name}>name</Text>
          <Text style={styles.points}>187pts</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.place}>5</Text>
        </View>
      </View>
      <View style={styles.div}>
        <View style={styles.pic} />
        <View style={styles.info}>
          <Text style={styles.name}>name</Text>
          <Text style={styles.points}>190pts</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.place}>4</Text>
        </View>
      </View>
      <View style={styles.div}>
        <View style={styles.pic} />
        <View style={styles.info}>
          <Text style={styles.name}>name</Text>
          <Text style={styles.points}>187pts</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.place}>5</Text>
        </View>
      </View>
      <View style={styles.div}>
        <View style={styles.pic} />
        <View style={styles.info}>
          <Text style={styles.name}>name</Text>
          <Text style={styles.points}>190pts</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.place}>4</Text>
        </View>
      </View>
      <View style={styles.div}>
        <View style={styles.pic} />
        <View style={styles.info}>
          <Text style={styles.name}>name</Text>
          <Text style={styles.points}>187pts</Text>
        </View>
        <View style={styles.border}>
          <Text style={styles.place}>5</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  txt: {
    color: '#1B1B1B',
    fontSize: 30,
    textAlign: 'center',
  },
  div: {
    borderWidth: 2,
    width: div,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: divHeight,
    borderRadius: 20,
    marginBottom: 10,
  },
  pic: {
    borderWidth: 5,
    borderColor: '#284B63',
    height: 72,
    width: 72,
    borderRadius: 36,
    marginLeft: 15,
  },
  info: {
    marginLeft: -info,
  },
  name: {
    color: '#1B1B1B',
    fontSize: 20,
  },
  points: {
    color: '#3C6E71',
    fontWeight: 'bold',
    fontSize: 20,
  },
  border: {
    backgroundColor: '#284B63',
    marginRight: 15,
    height: 22,
    width: 22,
    borderRadius: 50,
  },
  place: {
    color: '#F2F3F4',
    textAlign: 'center',
    fontSize: 16,
  },
});
