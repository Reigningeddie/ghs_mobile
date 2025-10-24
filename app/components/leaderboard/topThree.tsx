import {StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';
import {LeaderboardPlayer} from '../../../database/services/leaderboardService'

//Get device Width
const screenWidth = Dimensions.get('window').width;
const screenLength = Dimensions.get('window').height;

const top3 = screenLength / 10;
const thirds = screenWidth / 3 - 5;

interface TopThreeProps {
  data: LeaderboardPlayer[];
}

const TopThree = ({ data = [] }: TopThreeProps) => {
  // Ensure we always have 3 slots for the top 3
  const slots = [data[1], data[0], data[2]]; // 1st in center, 2nd left, 3rd right
  console.log('top ---->', data)
  return (
    <View style={styles.body}>
      <View style={styles.top3}>
        <View style={styles.info}>
          {/* Left (2nd place) */}
          <View style={[styles.sides, styles.left]}>
            <View style={styles.pic} />
            <Text style={styles.place}>2</Text>
            <Text style={styles.name}>{slots[0]?.user_name ?? '—'}</Text>
            <Text style={styles.points}>{slots[0]?.points ?? '—'} pts</Text>
          </View>

          {/* Center (1st place) */}
          <View style={styles.center}>
            <View style={styles.pic} />
            <Text style={styles.place}>1</Text>
            <Text style={styles.name}>{slots[1]?.user_name ?? '—'}</Text>
            <Text style={styles.points}>{slots[1]?.points ?? '—'} pts</Text>
          </View>

          {/* Right (3rd place) */}
          <View style={[styles.sides, styles.right]}>
            <View style={styles.pic} />
            <Text style={styles.place}>3</Text>
            <Text style={styles.name}>{slots[2]?.user_name ?? '—'}</Text>
            <Text style={styles.points}>{slots[2]?.points ?? '—'} pts</Text>
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
    height: 140
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
    height: 105
  },
});
