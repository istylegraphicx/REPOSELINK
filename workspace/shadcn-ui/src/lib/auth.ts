import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  plan: 'free' | 'professional' | 'premium';
  avatar?: string;
  createdAt: string;
  lastLogin: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    phone: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  checkAuth: () => boolean;
}

// Mock user database
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@reposelink.com',
    password: 'demo123',
    firstName: 'John',
    lastName: 'Doe',
    company: 'Memorial Gardens Funeral Home',
    phone: '+27 11 123 4567',
    plan: 'professional' as const,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    email: 'admin@reposelink.com',
    password: 'admin123',
    firstName: 'Sarah',
    lastName: 'Johnson',
    company: 'Peaceful Rest Funeral Services',
    phone: '+27 21 987 6543',
    plan: 'premium' as const,
    avatar: '/images/portrait.jpg',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: new Date().toISOString()
  }
];

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (mockUser) {
          const { password: _, ...user } = mockUser;
          const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString()
          };
          
          set({ 
            user: updatedUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },

      register: async (userData) => {
        set({ isLoading: true });
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if user already exists
        const existingUser = MOCK_USERS.find(u => u.email === userData.email);
        if (existingUser) {
          set({ isLoading: false });
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          ...userData,
          plan: 'free',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        // Add to mock database
        MOCK_USERS.push({ ...newUser, password: userData.password } as any);
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });
        }
      },

      checkAuth: () => {
        const { user } = get();
        return !!user;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);