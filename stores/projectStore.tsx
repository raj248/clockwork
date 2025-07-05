import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Project = {
  id: string
  description: string
  createdAt: string
  tags: string[]
}

interface ProjectState {
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
}

const tempProjects: Project[] = [
  {
    id: 'project-1',
    description: 'Clockwork Frontend Development',
    createdAt: new Date().toISOString(),
    tags: ['frontend', 'design'],
  },
  {
    id: 'project-2',
    description: 'Clockwork Backend Planning',
    createdAt: new Date().toISOString(),
    tags: ['backend', 'api'],
  },
  {
    id: 'project-3',
    description: 'Marketing Plan Drafting',
    createdAt: new Date().toISOString(),
    tags: ['marketing'],
  },
]

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: tempProjects,
      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),
      updateProject: (project) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === project.id ? project : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'clockwork-projects',
      onRehydrateStorage: () => (state) => {
        // Auto-populate temp data if empty
        if (state && state.projects.length === 0) {
          tempProjects.forEach((p) => state.addProject(p))
        }
      },
    }
  )
)
