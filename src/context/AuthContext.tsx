import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface IEntry {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string; // Or Date if you parse it
  mood?: string;
  readTime?: number;
  excerpt?: string;
  tags: string[];
  bannerImage?: string;
  views?: number;
  createdAt: string; // Or Date
  updatedAt: string; // Or Date
}

export interface IDraft {
  id: string;
  title: string;
  content: string;
  mood?: string;
  excerpt?: string;
  tags: string[];
  lastModified: string; // Or Date
  wordCount?: number;
}

interface IUser {
  id: string;
  email: string;
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  writingStreak?: number;
  viewsThisMonth?: number;
  engagements?: number;
  commentsCount?: number;
  totalReadingTime?: number;
  defaultMood?: string;
  autoSave: boolean;
  publicProfile: boolean;
  showReadingTime: boolean;
  allowComments: boolean;
  emailNotifications: boolean;
  commentNotifications: boolean;
  likeNotifications: boolean;
  weeklyDigest: boolean;
  createdAt: string; // Or Date
  entries: IEntry[];
  drafts: IDraft[];
}

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, userData: IUser) => void;
  logout: () => void;
  updateUser: (userData: Partial<IUser>) => Promise<void>;
  addDraftToUser: (draft: IDraft) => void;
  addEntryToUser: (entry: IEntry) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Optionally, fetch user data if needed, or decode token
      // For now, we'll assume the token itself is enough to indicate login
      // In a real app, you'd likely verify the token with the backend and fetch user details
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      // Example: Fetch user data if token is valid
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/me'); // Example endpoint to get user data
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      };
      fetchUser();
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, userData: IUser) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = async (userData: Partial<IUser>) => {
    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }
    try {
      const response = await axios.put('http://localhost:5000/api/auth/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Update local user state with response from backend
      console.log('User profile updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw error; // Re-throw to allow error handling in components
    }
  };

  const addDraftToUser = (draft: IDraft) => {
    setUser(prevUser => {
      if (prevUser) {
        return { ...prevUser, drafts: [...prevUser.drafts, draft] };
      }
      return prevUser;
    });
  };

  const addEntryToUser = (entry: IEntry) => {
    setUser(prevUser => {
      if (prevUser) {
        return { ...prevUser, entries: [...prevUser.entries, entry] };
      }
      return prevUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser, addDraftToUser, addEntryToUser }}>
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
