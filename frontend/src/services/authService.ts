// frontend/src/services/authService.ts
import axios from 'axios';
import { SignupData, LoginData, User, AuthSuccessResponse, ErrorResponse } from '../types/user';

const API_URL = 'http://localhost:8000';

const AUTH_API_ENDPOINT = `${API_URL}/api/auth`;

// Create an Axios instance for the auth API
const authApi = axios.create({
  baseURL: AUTH_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor for global error handling
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call failed:", error.response || error);
    const errorMessage = error.response?.data?.detail || error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(errorMessage));
  }
);

// Helper function to check if we're in the browser
const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
};

const saveUserData = (token: string, user: User) => {
  if (!isBrowser()) return;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

const clearUserData = () => {
  if (!isBrowser()) return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getToken = (): string | null => {
  if (!isBrowser()) return null;
  return localStorage.getItem('token');
};

const getUser = (): User | null => {
  if (!isBrowser()) return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const signup = async (data: SignupData): Promise<AuthSuccessResponse> => {
  const response = await authApi.post<AuthSuccessResponse>('/signup', data);
  const { token, user } = response.data;
  saveUserData(token, user);
  return response.data;
};

const login = async (data: LoginData): Promise<AuthSuccessResponse> => {
  const response = await authApi.post<AuthSuccessResponse>('/login', data);
  const { token, user } = response.data;
  saveUserData(token, user);
  return response.data;
};

const getMe = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) {
    clearUserData();
    return null;
  }
  try {
    const response = await authApi.get<User>('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data (token likely invalid):", error);
    clearUserData();
    return null;
  }
};

const logout = () => {
  clearUserData();
};

export const authService = {
  signup,
  login,
  getMe,
  logout,
  getToken,
  getUser,
};