export interface Task {
  id: string
  title: string
  type: string
  description?: string
  dueDate?: string
  completed: boolean
  items?: string[]
}

export interface ExternalTask {
  id: string
  title: string
  type?: string
  description?: string
  dueDate?: string
  completed?: boolean
  items?: string[]
}
