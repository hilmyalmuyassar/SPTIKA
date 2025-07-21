export interface User {
  id: string;
  fullName: string;
  email: string;
  studentId?: string;
  enrollmentYear?: number;
  program?: string;
  semester?: number;
  gpa?: number;
  profileImage?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}