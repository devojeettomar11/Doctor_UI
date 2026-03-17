import { create } from 'zustand';

const useUIStore = create((set) => ({
  isSidebarOpen: false,
  theme: 'light',
  notifications: [],

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTheme: (theme) => set({ theme }),
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, notification]
  })),
  clearNotifications: () => set({ notifications: [] }),
}));

export default useUIStore;
