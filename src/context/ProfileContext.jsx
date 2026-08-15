import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialProfile = {
  fullName: '',
  email: '',
  password: '',
  bio: '',
  location: '',
  favoriteCuisine: '',
};

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useLocalStorage('recipehub-profile', initialProfile);
  const [isRegistered, setIsRegistered] = useLocalStorage('recipehub-profile-registered', false);
  const [isSignedIn, setIsSignedIn] = useLocalStorage('recipehub-profile-signedin', false);

  const register = (fullName, email, password) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      fullName,
      email,
      password,
    }));
    setIsRegistered(true);
  };

  const login = (email, password) => {
    if (!isRegistered) {
      throw new Error('No account found. Please register first.');
    }
    if (profile.email !== email || profile.password !== password) {
      throw new Error('Invalid email or password.');
    }
    setIsSignedIn(true);
  };

  const updateProfile = (updates) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updates,
    }));
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

  return (
    <ProfileContext.Provider
      value={{ profile, isRegistered, isSignedIn, register, login, updateProfile, signOut }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);