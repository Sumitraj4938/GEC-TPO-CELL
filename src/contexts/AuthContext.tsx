import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/src/firebase';
import { getUserProfile, createUserProfile } from '@/src/lib/firestore-utils';
import { User as AppUser } from '@/src/types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await handleUserAuthenticated(firebaseUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUserAuthenticated = async (firebaseUser: FirebaseUser) => {
    try {
      const profile = await getUserProfile(firebaseUser.uid);
      if (profile) {
        // Map from Firestore doc to AppUser type
        setUser({
          id: profile.uid,
          name: profile.displayName || firebaseUser.displayName || 'GEC Student',
          email: profile.email || firebaseUser.email || '',
          role: profile.role || 'student',
          branch: profile.branch || 'All',
          created_at: profile.created_at || new Date().toISOString()
        } as AppUser);
      } else {
        // For new users (e.g. Google login), create a default student profile
        const newUser: Partial<AppUser> = {
          name: firebaseUser.displayName || 'GEC Student',
          email: firebaseUser.email || '',
          role: firebaseUser.email === 'gecvaishalitpo@gmail.com' ? 'staff' : (firebaseUser.email === 'sumitraj4938@gmail.com' ? 'admin' : 'student'),
          branch: 'All',
          created_at: new Date().toISOString()
        };
        await createUserProfile(firebaseUser.uid, newUser);
        setUser({ id: firebaseUser.uid, ...newUser } as AppUser);
      }
    } catch (error) {
      console.error('Error handling auth state change:', error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (error: any) {
      console.error('Email sign in error:', error);
      
      // Fallback/Bypass for the specific user requested if they fail to login (e.g. not created in Firebase yet)
      // Note: In production, you'd properly create this user in Firebase Console or via admin SDK.
      if (email === 'gecvaishalitpo@gmail.com' && password === 'Gecvaishali@tpohead.2026') {
        console.warn("Bypassing auth for hardcoded admin user locally.");
        const fakeAdminUser: AppUser = {
          id: 'admin-bypass-id',
          name: 'TPO Head',
          email: email,
          role: 'staff',
          branch: 'All',
          created_at: new Date().toISOString()
        };
        setUser(fakeAdminUser);
        return { error: null };
      }
      
      return { error };
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signInWithGoogle, signInWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
