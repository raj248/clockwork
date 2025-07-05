import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Session = {
  id: string
  projectId: string
  start: string
  end: string
  note: string
  tag: string
}

interface SessionState {
  sessions: Session[]
  addSession: (session: Session) => void
  updateSession: (session: Session) => void
  deleteSession: (id: string) => void
  getSessionsByProject: (projectId: string) => Session[]
  getTagsForProject: (projectId: string) => string[]
}

// TEMP DATA
const now = new Date()
const tempSessions: Session[] = [
  {
    id: 'session-1',
    projectId: 'project-1',
    start: new Date(now.getTime() - 7200 * 1000).toISOString(), // 2 hrs ago
    end: new Date(now.getTime() - 6600 * 1000).toISOString(),   // 1.83 hrs ago
    note: 'Created ProjectCard component and tested navigation',
    tag: 'frontend',
  },
  {
    id: 'session-2',
    projectId: 'project-1',
    start: new Date(now.getTime() - 5400 * 1000).toISOString(), // 1.5 hrs ago
    end: new Date(now.getTime() - 4800 * 1000).toISOString(),   // 1.33 hrs ago
    note: 'Styled cards with NativeWind and Paper',
    tag: 'design',
  },
  {
    id: 'session-3',
    projectId: 'project-2',
    start: new Date(now.getTime() - 3600 * 1000).toISOString(), // 1 hr ago
    end: new Date(now.getTime() - 3000 * 1000).toISOString(),   // 50 min ago
    note: 'Planned REST API endpoints for session management',
    tag: 'backend',
  },
  {
    id: 'session-4',
    projectId: 'project-3',
    start: new Date(now.getTime() - 1800 * 1000).toISOString(), // 30 min ago
    end: new Date(now.getTime() - 1200 * 1000).toISOString(),   // 20 min ago
    note: 'Researched micro-content strategy',
    tag: 'marketing',
  },
]

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: tempSessions,
      addSession: (session) =>
        set((state) => ({ sessions: [session, ...state.sessions] })),
      updateSession: (session) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === session.id ? session : s
          ),
        })),
      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),
      getSessionsByProject: (projectId) => {
        return get().sessions.filter((s) => s.projectId === projectId)
      },
      getTagsForProject: (projectId) => {
        const tagsSet = new Set(
          get()
            .sessions.filter((s) => s.projectId === projectId)
            .map((s) => s.tag)
        )
        return Array.from(tagsSet)
      },
    }),
    {
      name: 'clockwork-sessions',
    }
  )
)
