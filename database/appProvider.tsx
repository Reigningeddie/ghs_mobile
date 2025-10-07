import React from 'react';
import { AuthProvider } from './context/authContext';
import { TargetProvider } from './context/targetContext';
import { FriendsProvider } from './context/friendsContext';
import { SearchProvider } from './context/searchContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <TargetProvider>
        <FriendsProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </FriendsProvider>
      </TargetProvider>
    </AuthProvider>
  );
};