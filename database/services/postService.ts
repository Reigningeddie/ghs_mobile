import { supabase } from '../supabase';

// --- TYPES ---

export type Post = {
  id: number;
  user_id: number;
  opponent_id?: number | null;
  type: 'grand_slam' | 'challenge' | 'other';
  caption?: string | null;
  created_at: string;
};

export type PostComment = {
  id: number;
  post_id: number;
  user_id: number;
  text: string;
  created_at: string;
};

export type PostWithProfile = {
  id: number;
  user_id: number;
  user_name: string;
  avatar_url?: string | null;
  opponent_id?: number | null;
  opponent_name?: string | null;
  opponent_avatar_url?: string | null;
  type: 'grand_slam' | 'challenge' | 'other';
  caption?: string | null;
  created_at: string;
  like_count: number;
  isLiked?: boolean;
  comment_count: number;
};

// --- SERVICES ---

/**
 * Fetch posts with user/opponent info and counts from RPC
 * FIX: Used <PostWithProfile[], {}> to satisfy the two type argument requirement 
 * for the Supabase .rpc() method, resolving TS2558 and TS2344.
 */
export const getPostsWithProfileCounts = async (): Promise<PostWithProfile[]> => {
  const { data, error } = await supabase
    .rpc('get_posts_with_profile_counts'); // Remove generics here

  if (error) throw error;
  
  // Cast the returned data to the expected type
  return (data ?? []) as PostWithProfile[]; 
};

/**
 * Add a new post
 */
export const addPost = async (post: {
  user_id: number;
  opponent_id?: number;
  type: 'grand_slam' | 'challenge' | 'other';
  caption?: string;
}): Promise<Post> => {
  if (post.caption && post.caption.length > 120) {
    throw new Error('Caption exceeds 120 characters');
  }

  const { data, error } = await supabase
    // FIX: Remove generic types from .from() to satisfy the 'string' constraint
    .from('posts') 
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  
  // Explicitly cast the data to 'Post' to ensure the function returns the correct type
  return data as Post; 
};

/**
 * Add a comment to a post
 */
export const addComment = async (comment: {
  post_id: number;
  user_id: number;
  text: string;
}): Promise<PostComment> => {
  if (comment.text.length > 120) throw new Error('Comment exceeds 120 characters');

  const { data, error } = await supabase
    // FIX: Remove generic type from .from()
    .from('post_comments')
    .insert(comment)
    .select()
    .single();

  if (error) throw error;
  
  // Explicitly cast the data to 'PostComment'
  return data as PostComment; 
};

/**
 * Like a post
 */
export const likePost = async (post_id: number, user_id: number): Promise<void> => {
  const { error } = await supabase
    .from('post_likes')
    .insert({ post_id, user_id });

  if (error) throw error;
};

/**
 * Unlike a post (remove the like)
 */
export const unlikePost = async (post_id: number, user_id: number): Promise<void> => {
  const { error } = await supabase
    .from('post_likes')
    .delete() 
    .eq('post_id', post_id) 
    .eq('user_id', user_id); 

  if (error) throw error;
};