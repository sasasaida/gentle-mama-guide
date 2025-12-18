import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PregnancyProfile {
  dueDate: string | null;
  lastPeriodDate: string | null;
  name: string;
  reminderTime: string;
}

export interface DailyLog {
  date: string;
  mood: 'great' | 'good' | 'okay' | 'tired' | 'difficult' | null;
  symptoms: string[];
  weight: number | null;
  bloodPressure: { systolic: number; diastolic: number } | null;
  notes: string;
}

export interface MealLog {
  date: string;
  meals: { foodId: string; mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' }[];
}

export interface AppState {
  // Profile
  profile: PregnancyProfile;
  setProfile: (profile: Partial<PregnancyProfile>) => void;
  
  // Daily logs
  dailyLogs: DailyLog[];
  addDailyLog: (log: DailyLog) => void;
  updateDailyLog: (date: string, log: Partial<DailyLog>) => void;
  getDailyLog: (date: string) => DailyLog | undefined;
  
  // Meal logs
  mealLogs: MealLog[];
  addMealLog: (log: MealLog) => void;
  getMealLog: (date: string) => MealLog | undefined;
  
  // Chat history
  chatHistory: { role: 'user' | 'assistant'; content: string; timestamp: string }[];
  addChatMessage: (role: 'user' | 'assistant', content: string) => void;
  clearChatHistory: () => void;
  
  // Emergency contacts (custom ones)
  customEmergencyContacts: { name: string; number: string; relationship: string }[];
  addEmergencyContact: (contact: { name: string; number: string; relationship: string }) => void;
  removeEmergencyContact: (index: number) => void;
  
  // App state
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Profile
      profile: {
        dueDate: null,
        lastPeriodDate: null,
        name: '',
        reminderTime: '09:00'
      },
      setProfile: (profile) => 
        set((state) => ({ profile: { ...state.profile, ...profile } })),
      
      // Daily logs
      dailyLogs: [],
      addDailyLog: (log) =>
        set((state) => {
          const existing = state.dailyLogs.findIndex(l => l.date === log.date);
          if (existing >= 0) {
            const updated = [...state.dailyLogs];
            updated[existing] = log;
            return { dailyLogs: updated };
          }
          return { dailyLogs: [...state.dailyLogs, log] };
        }),
      updateDailyLog: (date, log) =>
        set((state) => {
          const existing = state.dailyLogs.findIndex(l => l.date === date);
          if (existing >= 0) {
            const updated = [...state.dailyLogs];
            updated[existing] = { ...updated[existing], ...log };
            return { dailyLogs: updated };
          }
          return { dailyLogs: [...state.dailyLogs, { date, mood: null, symptoms: [], weight: null, bloodPressure: null, notes: '', ...log }] };
        }),
      getDailyLog: (date) => get().dailyLogs.find(l => l.date === date),
      
      // Meal logs
      mealLogs: [],
      addMealLog: (log) =>
        set((state) => {
          const existing = state.mealLogs.findIndex(l => l.date === log.date);
          if (existing >= 0) {
            const updated = [...state.mealLogs];
            updated[existing] = log;
            return { mealLogs: updated };
          }
          return { mealLogs: [...state.mealLogs, log] };
        }),
      getMealLog: (date) => get().mealLogs.find(l => l.date === date),
      
      // Chat history
      chatHistory: [],
      addChatMessage: (role, content) =>
        set((state) => ({
          chatHistory: [...state.chatHistory, { role, content, timestamp: new Date().toISOString() }]
        })),
      clearChatHistory: () => set({ chatHistory: [] }),
      
      // Emergency contacts
      customEmergencyContacts: [],
      addEmergencyContact: (contact) =>
        set((state) => ({
          customEmergencyContacts: [...state.customEmergencyContacts, contact]
        })),
      removeEmergencyContact: (index) =>
        set((state) => ({
          customEmergencyContacts: state.customEmergencyContacts.filter((_, i) => i !== index)
        })),
      
      // App state
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value })
    }),
    {
      name: 'mellow-storage',
      version: 1
    }
  )
);

// Utility functions
export function calculatePregnancyWeek(dueDate: string | null): { week: number; day: number } | null {
  if (!dueDate) return null;
  
  const due = new Date(dueDate);
  const today = new Date();
  const conception = new Date(due);
  conception.setDate(conception.getDate() - 280); // 40 weeks before due date
  
  const diffTime = today.getTime() - conception.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return { week: 0, day: 0 };
  if (diffDays > 280) return { week: 40, day: 0 };
  
  const week = Math.floor(diffDays / 7);
  const day = diffDays % 7;
  
  return { week, day };
}

export function getDaysUntilDue(dueDate: string | null): number | null {
  if (!dueDate) return null;
  
  const due = new Date(dueDate);
  const today = new Date();
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1;
  if (week <= 26) return 2;
  return 3;
}
