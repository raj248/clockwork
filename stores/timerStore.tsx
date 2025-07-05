import { create } from 'zustand'

interface TimerState {
  isRunning: boolean
  startTime: number | null
  projectId: string | null
  startTimer: (projectId?: string) => void
  stopTimer: () => void
  resetTimer: () => void
}

export const useTimerStore = create<TimerState>((set, get) => ({
  isRunning: false,
  startTime: null,
  projectId: null,
  startTimer: (projectId) => {
    // console.log("Timer Store: ", get())
    set({
      isRunning: true,
      startTime: Date.now(),
      projectId: projectId || null,
    })
    // console.log("Timer Started: ", get())
  },
  stopTimer: () => set({ isRunning: false }),
  resetTimer: () => {
    set({ isRunning: false, startTime: null, projectId: null })
    // console.log(get())
  },
}))
