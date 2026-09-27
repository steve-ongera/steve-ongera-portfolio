import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Profile / hero / SEO meta ----
export const getProfile = () => api.get('/profile/').then((res) => res.data);

// ---- Resume data ----
export const getSkills = () => api.get('/skills/').then((res) => res.data);
export const getExperience = () => api.get('/experience/').then((res) => res.data);
export const getEducation = () => api.get('/education/').then((res) => res.data);

// ---- Projects ----
export const getProjects = (params = {}) =>
  api.get('/projects/', { params }).then((res) => res.data);

export const getFeaturedProjects = () =>
  api.get('/projects/', { params: { featured: 'true' } }).then((res) => res.data);

export const getProjectBySlug = (slug) =>
  api.get(`/projects/${slug}/`).then((res) => res.data);

// ---- Blog ----
export const getPosts = (params = {}) =>
  api.get('/posts/', { params }).then((res) => res.data);

export const getFeaturedPosts = () =>
  api.get('/posts/', { params: { featured: 'true' } }).then((res) => res.data);

export const getPostBySlug = (slug) =>
  api.get(`/posts/${slug}/`).then((res) => res.data);

// ---- Contact & newsletter ----
export const submitContactForm = (payload) =>
  api.post('/contact/', payload).then((res) => res.data);

export const subscribeToNewsletter = (email) =>
  api.post('/newsletter/', { email }).then((res) => res.data);

export default api;
