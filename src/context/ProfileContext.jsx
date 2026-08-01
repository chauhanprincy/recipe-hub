import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialProfile = {
  fullName: '',
  email: '',
  bio: '',
  location: '',
  favoriteCuisine: '',
};

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useLocalStorage('recipehub-profile', initialProfile);
  const [isSignedIn, setIsSignedIn] = useLocalStorage('recipehub-profile-signedin', false);

  const signIn = (fullName, email) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      fullName,
      email,
    }));
    setIsSignedIn(true);
  };

  const updateProfile = (updates) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updates,
    }));
  };

  const signOut = () => {
    setProfile({ ...initialProfile });
    setIsSignedIn(false);
  };

  return (
    <ProfileContext.Provider value={{ profile, isSignedIn, signIn, updateProfile, signOut }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
