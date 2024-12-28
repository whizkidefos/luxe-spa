import { create } from 'zustand';
import { authApi } from '../lib/api/auth';
import type { User } from '@supabase/supabase-js';

interface AuthStore {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  signIn: async (email, password) => {
    const { user } = await authApi.signIn(email, password);
    set({ user });
  },
  signUp: async (email, password) => {
    const { user } = await authApi.signUp(email, password);
    set({ user });
  },
  signOut: async () => {
    await authApi.signOut();
    set({ user: null });
  },
  setUser: (user) => set({ user, loading: false }),
}));