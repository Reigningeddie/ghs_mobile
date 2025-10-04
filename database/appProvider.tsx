import React from 'react';
import { AuthProvider } from './context/authContext';
import { TargetProvider } from './context/targetContext';
import { FriendsProvider } from './context/friendsContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <TargetProvider>
        <FriendsProvider>
          {children}
        </FriendsProvider>
      </TargetProvider>
    </AuthProvider>
  );
};