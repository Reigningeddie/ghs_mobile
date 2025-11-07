import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PostWithProfile,
  getPostsWithProfileCounts,
  likePost,
  unlikePost,
  addComment,
  addPost as addPostService,
} from '../services/postService';

interface PostsContextType {
  posts: PostWithProfile[];
  loading: boolean;
  refreshPosts: () => Promise<void>;
  handleLike: (post_id: number, user_id: number) => Promise<void>;
  handleUnlike: (post_id: number, user_id: number) => Promise<void>;
  handleAddComment: (post_id: number, user_id: number, text: string) => Promise<void>;
  addPost: (post: { user_id: number; opponent_id?: number; type: 'grand_slam' | 'challenge' | 'other'; caption?: string }) => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  const refreshPosts = async () => {
    setLoading(true);
    try {
      const data = await getPostsWithProfileCounts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    } finally {
      setLoading(false);
    }
  };

  // Like a post
  const handleLike = async (post_id: number, user_id: number) => {
    try {
      await likePost(post_id, user_id);
      setPosts(prev =>
        prev.map(p => (p.id === post_id ? { ...p, like_count: p.like_count + 1, isLiked: true } : p))
      );
    } catch (err) {
      console.error('Failed to like post', err);
    }
  };

  // Unlike a post
  const handleUnlike = async (post_id: number, user_id: number) => {
    try {
      await unlikePost(post_id, user_id);
      setPosts(prev =>
        prev.map(p => (p.id === post_id ? { ...p, like_count: Math.max(p.like_count - 1, 0), isLiked: false } : p))
      );
    } catch (err) {
      console.error('Failed to unlike post', err);
    }
  };

  // Add a comment
  const handleAddComment = async (post_id: number, user_id: number, text: string) => {
    try {
      await addComment({ post_id, user_id, text });
      setPosts(prev =>
        prev.map(p => (p.id === post_id ? { ...p, comment_count: p.comment_count + 1 } : p))
      );
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  // Add a new post
  const addPost = async (post: { user_id: number; opponent_id?: number; type: 'grand_slam' | 'challenge' | 'other'; caption?: string }) => {
    try {
      const newPost = await addPostService(post);
      await refreshPosts(); // Optional: refresh to get full profile data
    } catch (err) {
      console.error('Failed to add post', err);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, loading, refreshPosts, handleLike, handleUnlike, handleAddComment, addPost }}
    >
      {children}
    </PostsContext.Provider>
  );
};

// Hook for easy access
export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
