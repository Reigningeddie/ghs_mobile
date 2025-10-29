import React from 'react';
import { AuthProvider } from './context/authContext';
import { ProfileProvider } from './context/profileContext';
import { TargetProvider } from './context/targetContext';
import { FriendsProvider } from './context/friendsContext';
import { SearchProvider } from './context/searchContext';
import { GameProvider } from './context/gameContext';
import { PostsProvider } from './context/postContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <TargetProvider>
          <FriendsProvider>
            <SearchProvider>
              <GameProvider>
                <PostsProvider>
                  {children}
                </PostsProvider>
              </GameProvider>
            </SearchProvider>
          </FriendsProvider>
        </TargetProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};