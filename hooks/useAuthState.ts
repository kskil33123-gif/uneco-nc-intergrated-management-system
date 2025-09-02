import { useState, useEffect } from 'react';
// FIX: Removed modular imports for onAuthStateChanged and User, which are not available in Firebase v8/compat mode.
// import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/config';
// FIX: Imported the firebase namespace to get access to the firebase.User type.
import firebase from 'firebase/compat/app';

export const useAuthState = () => {
  // FIX: Used firebase.User type which is the correct type for v8/compat mode.
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIX: Switched to v8/compat syntax for listening to auth state changes.
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
