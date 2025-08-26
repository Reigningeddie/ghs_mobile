import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
//components
import TopThree from '../../../../assets/components/topThree';
import UnderThree from '../../../../assets/components/underThree';

const LeaderBoard = (): React.JSX.Element => {
  return (
    <View style={styles.body}>
      <TopThree />
        <ScrollView>
          <UnderThree />
        </ScrollView>
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
