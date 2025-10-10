import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';

//Get device Width
const screenWidth = Dimensions.get('window').width;
const screenLength = Dimensions.get('window').height;

const top3 = screenLength / 10;
const thirds = screenWidth / 3 - 5;

const TopThree = (): React.JSX.Element => {
  return (
    <View style={styles.body}>
      <View style={styles.top3}>
        <View style={styles.info}>
          <View style={[styles.sides, styles.left]}>
            <View style={styles.pic} />
            <Text style={styles.place}>2</Text>
            <Text style={styles.name}>name</Text>
            <Text style={styles.points}>200pts</Text>
          </View>
          <View style={styles.center}>
            <View style={styles.pic} />
            <Text style={styles.place}>1</Text>
            <Text style={styles.name}>name</Text>
            <Text style={styles.points}>252pts</Text>
          </View>
          <View style={[styles.sides, styles.right]}>
            <View style={styles.pic} />
            <Text style={styles.place}>3</Text>
            <Text style={styles.name}>name</Text>
            <Text style={styles.points}>198pts</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopThree;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F2F3F4',
  },
  top3: {
    alignItems: 'center',
    width: screenWidth,
    marginTop: top3,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sides: {
    borderWidth: 1,
    width: thirds,
    height: 140,
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  pic: {
    borderWidth: 5,
    height: 95,
    width: 95,
    borderRadius: 55,
    backgroundColor: '#F2F3F4',
    marginTop: -65,
    borderColor: '#284B63',
  },
  place: {
    color: '#F2F3F4',
    backgroundColor: '#284B63',
    borderRadius: 50,
    height: 22,
    width: 22,
    textAlign: 'center',
    marginTop: -15,
    fontSize: 16,
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
  left: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  center: {
    color: 'white',
    borderWidth: 1,
    width: thirds,
    height: 190,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    alignItems: 'center',
    backgroundColor: '#F2F3F4',
  },
  right: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
