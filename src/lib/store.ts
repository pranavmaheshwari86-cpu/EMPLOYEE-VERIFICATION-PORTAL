import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchAPI } from './api';

export type UserRole = 'EMPLOYEE' | 'RECRUITER' | 'ADMIN';

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  companyName?: string;
  officialEmail?: string;
  website?: string;
  hrName?: string;
  industryType?: string;
  location?: string;
  experience?: number;
  techStack?: string[];
  languages?: string[];
  workExperience?: WorkExperience[];
  introduction?: string;
  isFresher?: boolean;
}

export interface Job {
  id: string;
  companyName: string;
  companyId: string;
  jobTitle: string;
  skills: string[];
  experience: string;
  salary: string;
  location: string;
  workType: string;
  description: string;
  lastDate: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

interface AppState {
  // Auth State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (data: Partial<User> & { password?: string }) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;

  // UI/Theme State
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Jobs State
  jobs: Job[];
  postJob: (job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  
  appliedJobs: string[];
  applyForJob: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth State
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email, password, role) => {
        set({ isLoading: true });
        try {
          const response = await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
          });
          
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          
          set({
            user: {
              id: response.user.id,
              email: response.user.email,
              firstName: response.user.firstName || 'User',
              lastName: response.user.lastName || '',
              role: response.user.role,
            },
            isAuthenticated: true,
            isLoading: false,
          });

          get().addNotification({
            title: 'Login Successful',
            message: 'Welcome back to AETHERIS.',
          });
        } catch (error: any) {
          set({ isLoading: false });
          get().addNotification({
            title: 'Login Failed',
            message: error.message || 'An error occurred during login.',
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true });
        try {
          const response = await fetchAPI('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ 
              email: data.email, 
              password: data.password || 'Temp123!', 
              role: data.role || 'EMPLOYEE',
              firstName: data.firstName,
              lastName: data.lastName
            })
          });
          
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          
          set({
            user: {
              id: response.user.id,
              email: response.user.email,
              firstName: response.user.firstName || data.firstName || 'New',
              lastName: response.user.lastName || data.lastName || 'User',
              role: response.user.role || data.role || 'EMPLOYEE',
              companyName: data.companyName,
              officialEmail: data.officialEmail,
              website: data.website,
              hrName: data.hrName,
              industryType: data.industryType,
              location: data.location,
            },
            isAuthenticated: true,
            isLoading: false,
          });

          get().addNotification({
            title: 'Account Created',
            message: 'Your AETHERIS identity has been initialized.',
          });
        } catch (error: any) {
          set({ isLoading: false });
          get().addNotification({
            title: 'Registration Failed',
            message: error.message || 'An error occurred during registration.',
          });
          throw error;
        }
      },

      updateUser: (updates) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          isAuthenticated: false,
          notifications: [],
        });
      },

      // UI/Theme State
      sidebarExpanded: true,
      setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),

      // Notifications
      notifications: [
        {
          id: '1',
          title: 'System Initialized',
          message: 'AETHERIS Neural Network is online and fully operational.',
          read: false,
          timestamp: new Date().toISOString(),
        }
      ],
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: Math.random().toString(36).substring(2, 11),
              read: false,
              timestamp: new Date().toISOString(),
            },
            ...state.notifications,
          ],
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      clearAllNotifications: () => set({ notifications: [] }),

      // Jobs State
      jobs: [],
      postJob: (job) => 
        set((state) => ({
          jobs: [
            {
              id: Math.random().toString(36).substring(2, 11),
              companyName: job.companyName || '',
              companyId: job.companyId || '',
              jobTitle: job.jobTitle || '',
              skills: job.skills || [],
              experience: job.experience || '',
              salary: job.salary || '',
              location: job.location || '',
              workType: job.workType || '',
              description: job.description || '',
              lastDate: job.lastDate || '',
              createdAt: new Date().toISOString(),
            } as Job,
            ...state.jobs,
          ],
        })),
      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        })),
      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((j) => (j.id === id ? { ...j, ...updates } : j)),
        })),

      appliedJobs: [],
      applyForJob: (id) =>
        set((state) => ({
          appliedJobs: state.appliedJobs.includes(id) ? state.appliedJobs : [...state.appliedJobs, id],
        })),
    }),
    {
      name: 'aetheris-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sidebarExpanded: state.sidebarExpanded,
        jobs: state.jobs,
        appliedJobs: state.appliedJobs,
      }), // only persist these fields
    }
  )
);
