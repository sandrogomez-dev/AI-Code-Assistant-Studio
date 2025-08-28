import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
      username: email,
      password,
    });
    return response.data;
  },

  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },
};

// Code API
export const code = {
  generate: async (prompt: string, language: string) => {
    const response = await api.post('/code/generate', {
      prompt,
      language,
    });
    return response.data;
  },

  analyze: async (code: string, language: string) => {
    const response = await api.post('/code/analyze', {
      prompt: code,
      language,
    });
    return response.data;
  },
};

// Analysis API
export const analysis = {
  performance: async (code: string, language: string) => {
    const response = await api.post('/analysis/performance', {
      code,
      language,
    });
    return response.data;
  },

  security: async (code: string, language: string) => {
    const response = await api.post('/analysis/security', {
      code,
      language,
    });
    return response.data;
  },
};
