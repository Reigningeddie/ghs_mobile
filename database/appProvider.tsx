import React from 'react';
import { AuthProvider } from './authContext';
import { TargetProvider } from './targetContext';
import { FriendsProvider } from './friendsContext';

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