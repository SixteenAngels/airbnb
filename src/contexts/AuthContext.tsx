import React from 'react';
import { Alert } from 'react-native';
import { getSupabaseClient } from '../config/supabase';

export type AuthUser = {
  id: string;
  email?: string | null;
} | null;

type AuthContextValue = {
  user: AuthUser;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isSupabaseEnabled: boolean;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = getSupabaseClient();
  const [user, setUser] = React.useState<AuthUser>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const isSupabaseEnabled = Boolean(supabase);

  React.useEffect(() => {
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        if (!supabase) {
          // If Supabase isn't configured, allow browsing as a guest
          setUser({ id: 'guest', email: null });
          return;
        }
        const { data } = await supabase.auth.getSession();
        const sUser = data.session?.user;
        setUser(sUser ? { id: sUser.id, email: sUser.email } : null);
        const sub = supabase.auth.onAuthStateChange((_event, session) => {
          const next = session?.user ? { id: session.user.id, email: session.user.email } : null;
          setUser(next);
        });
        unsub = () => {
          try { sub.data.subscription.unsubscribe(); } catch {}
        };
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      if (unsub) unsub();
    };
  }, [supabase]);

  const signIn = React.useCallback(async (email: string, password: string) => {
    try {
      if (!supabase) {
        setUser({ id: 'guest', email });
        return true;
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Sign in failed', error.message);
        return false;
      }
      const u = data.user;
      setUser(u ? { id: u.id, email: u.email } : null);
      return true;
    } catch (e: any) {
      Alert.alert('Sign in error', e?.message ?? 'Unknown error');
      return false;
    }
  }, [supabase]);

  const signUp = React.useCallback(async (email: string, password: string) => {
    try {
      if (!supabase) {
        setUser({ id: 'guest', email });
        return true;
      }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        Alert.alert('Sign up failed', error.message);
        return false;
      }
      const u = data.user;
      setUser(u ? { id: u.id, email: u.email } : null);
      return true;
    } catch (e: any) {
      Alert.alert('Sign up error', e?.message ?? 'Unknown error');
      return false;
    }
  }, [supabase]);

  const signOut = React.useCallback(async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      setUser(null);
    } catch (e: any) {
      Alert.alert('Sign out error', e?.message ?? 'Unknown error');
    }
  }, [supabase]);

  const value = React.useMemo(
    () => ({ user, loading, signIn, signUp, signOut, isSupabaseEnabled }),
    [user, loading, signIn, signUp, signOut, isSupabaseEnabled]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

