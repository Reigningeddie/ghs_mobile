import {ScrollView, ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react';
import { fetchLeaderboard, LeaderboardPlayer } from '../../../../database/services/leaderboardService'
//components
import TopThree from '../../../components/leaderboard/topThree';
import UnderThree from '../../../components/leaderboard/underThree';

const LeaderBoard = (): React.JSX.Element => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaderboard(); // your API call
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  const topThree = leaderboard.slice(0, 3);
  const underThree = leaderboard.slice(3);

  return (
    <ScrollView>
      <TopThree data={topThree} />
      <UnderThree data={underThree} />
    </ScrollView>
  );
};

export default LeaderBoard;

