import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { User, LoginCredentials, AuthState } from './types/user';
import { authenticateUser, getUserSession, saveUserSession, clearUserSession } from './utils/auth';

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = () => {
      const sessionUser = getUserSession();
      if (sessionUser) {
        setAuthState({
          user: sessionUser,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    setLoginLoading(true);
    setLoginError(null);

    try {
      const user = await authenticateUser(credentials);
      
      if (user) {
        saveUserSession(user);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      }
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearUserSession();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    setLoginError(null);
  };

  // Show loading spinner while checking session
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {authState.isAuthenticated && authState.user ? (
        <>
          <Header user={authState.user} onLogout={handleLogout} />
          <Dashboard user={authState.user} />
        </>
      ) : (
        <LoginForm 
          onLogin={handleLogin} 
          isLoading={loginLoading}
          error={loginError}
        />
      )}
    </div>
  );
}

export default App;