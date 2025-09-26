-- Create friends table
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  friend_id INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(10) NOT NULL DEFAULT 'pending'
);

-- Create indexes on friends table
CREATE INDEX idx_friends_user_id ON friends (user_id);
CREATE INDEX idx_friends_friend_id ON friends (friend_id);

-- Create friend_pending table
CREATE TABLE friend_pending (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  friend_id INTEGER NOT NULL REFERENCES users(id)
);

-- Create indexes on friend_pending table
CREATE INDEX idx_friend_pending_user_id ON friend_pending (user_id);
CREATE INDEX idx_friend_pending_friend_id ON friend_pending (friend_id);

-- Add foreign key constraints to establish relationships between tables
ALTER TABLE friends ADD CONSTRAINT fk_friends_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE friends ADD CONSTRAINT fk_friends_friend_id FOREIGN KEY (friend_id) REFERENCES users(id);
ALTER TABLE friend_pending ADD CONSTRAINT fk_friend_pending_user_id FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE friend_pending ADD CONSTRAINT fk_friend_pending_friend_id FOREIGN KEY (friend_id) REFERENCES users(id);
