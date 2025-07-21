import { User, LoginCredentials } from '../types/user';
import { mockUsers } from '../data/users';

// Simulate secure authentication
export const authenticateUser = async (credentials: LoginCredentials): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Find user by email
  const user = mockUsers.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // In production, compare hashed passwords
  if (user.password !== credentials.password) {
    throw new Error('Invalid email or password');
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Session management
export const saveUserSession = (user: User): void => {
  localStorage.setItem('sptika_user', JSON.stringify(user));
  localStorage.setItem('sptika_session', Date.now().toString());
};

export const getUserSession = (): User | null => {
  try {
    const userStr = localStorage.getItem('sptika_user');
    const sessionStr = localStorage.getItem('sptika_session');
    
    if (!userStr || !sessionStr) {
      return null;
    }
    
    // Check if session is valid (24 hours)
    const sessionTime = parseInt(sessionStr);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    if (now - sessionTime > twentyFourHours) {
      clearUserSession();
      return null;
    }
    
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const clearUserSession = (): void => {
  localStorage.removeItem('sptika_user');
  localStorage.removeItem('sptika_session');
};

// Input validation and sanitization
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 1; // Minimal validation for demo
};