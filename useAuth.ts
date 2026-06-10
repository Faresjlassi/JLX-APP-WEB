import { useEffect } from 'react';
import { supabase, getProfile } from '@/lib/supabase';
import { useAuthStore } from '@/lib/store';

export function useAuth() {
  const { session, profile, loading, setSession, setProfile, setLoading, clear } = useAuthStore();
  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => {
      setSession(session);
      if (session?.user) getProfile(session.user.id).then(({ data }) => { setProfile(data); setLoading(false); });
      else setLoading(false);
    });
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      if (session?.user) getProfile(session.user.id).then(({ data }) => setProfile(data));
      else clear();
    });
    return () => subscription.unsubscribe();
  }, []);
  return { session, profile, loading, isAuth: !!session };
}
