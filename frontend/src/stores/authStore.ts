import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth } from '@/services/api';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await auth.login(email, password);
          set({
            token: response.access_token,
            isAuthenticated: true,
            user: response.user,
          });
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          const response = await auth.register(username, email, password);
          // After registration, automatically log in
          await auth.login(email, password);
          set({
            token: response.access_token,
            isAuthenticated: true,
            user: response.user,
          });
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
