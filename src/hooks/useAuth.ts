import { useState, useEffect } from 'react';
import { GoogleUser, getUser } from '../lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(getUser());

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return user;
};