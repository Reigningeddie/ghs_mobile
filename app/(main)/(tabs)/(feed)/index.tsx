import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, RefreshControl } from 'react-native';
import { usePosts } from '../../../../database/context/postContext';

const photoWidth = '25%';

const Feed = () => {
  const { posts, loading, handleLike, handleUnlike, refreshPosts } = usePosts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshPosts();
    } catch (error) {
      console.error('Error refreshing posts:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshPosts])

  if (loading && !refreshing) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <ScrollView 
    contentContainerStyle={styles.body}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='black' />}
    >
      <Text style={styles.activity}>All Activity</Text>

      {posts.map(post => (
        <View key={post.id} style={styles.card}>
          {/* VS Section */}
          <View style={styles.vsView}>
            <View style={styles.player}>
              {/* Could add Image source={post.user_avatar_url} */}
            </View>

            <View style={styles.gshText}>
              <Text style={styles.gsh}>Grand Hand</Text>
              <Text style={styles.gsh}>Slammed</Text>
              <Text style={styles.time}>
                {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>

            <View style={styles.oponent}>
              {/* Could add Image source={post.opponent_avatar_url} */}
            </View>
          </View>

          {/* Names */}
          <View style={styles.nameArea}>
            <Text style={styles.name}>{post.user_name}</Text>
            <Text style={styles.opponentName}>{post.opponent_name ?? 'N/A'}</Text>
          </View>

          {/* Caption */}
          <View style={styles.captionArea}>
            <Text style={styles.caption}>{post.caption ?? ''}</Text>
          </View>

          {/* Likes and Comments */}
          <View style={styles.interactions}>
            <Pressable onPress={() => handleLike(post.id, post.user_id)}>
              <Image source={require('../../../../assets/likeActive.png')} style={styles.icon} />
            </Pressable>
            <Text style={styles.likes}>{post.like_count}</Text>

            <Image source={require('../../../../assets/comments.png')} style={[styles.icon, { marginLeft: 15 }]} />
            <Text style={styles.comment}>{post.comment_count}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    marginTop: 50,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  activity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  card: {
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    width: '97%',
    backgroundColor: '#284B63',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  vsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  player: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 5,
    height: 120,
    width: photoWidth,
  },
  gshText: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  gsh: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  oponent: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderRadius: 5,
    height: 120,
    width: photoWidth,
  },
  nameArea: {
    flexDirection: 'row',
    marginTop: 5,
  },
  name: {
    color: 'white',
    width: '48%',
    fontSize: 15,
    marginLeft: 3,
  },
  opponentName: {
    color: 'white',
    width: '50%',
    textAlign: 'right',
    fontSize: 15,
  },
  time: {
    fontSize: 13,
    color: 'white',
  },
  captionArea: {
    alignItems: 'center',
    marginVertical: 5,
  },
  caption: {
    color: 'white',
    fontSize: 17,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  likes: {
    marginLeft: 5,
    color: 'white',
  },
  comment: {
    marginLeft: 5,
    color: 'white',
  },
  icon: {
    height: 20,
    width: 20,
  },
});
