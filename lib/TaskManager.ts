// Singleton Pattern Implementation
import type { Task } from "@/types/Task"
import type { Dispatch, SetStateAction } from "react"

class TaskManagerClass {
  getTasks() {
    throw new Error("Method not implemented.")
  }
  private static instance: TaskManagerClass

  private constructor() {}

  public static getInstance(): TaskManagerClass {
    if (!TaskManagerClass.instance) {
      TaskManagerClass.instance = new TaskManagerClass()
    }
    return TaskManagerClass.instance
  }

  public addTask(task: Task, setTasks: Dispatch<SetStateAction<Task[]>>): void {
    setTasks((prevTasks) => [...prevTasks, task])
  }

  public removeTask(taskId: string, setTasks: Dispatch<SetStateAction<Task[]>>): void {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  public toggleTaskCompletion(taskId: string, setTasks: Dispatch<SetStateAction<Task[]>>): void {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )
  }

  public searchTasks(query: string, tasks: Task[]): Task[] {
    const lowerCaseQuery = query.toLowerCase()
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerCaseQuery) ||
        (task.description && task.description.toLowerCase().includes(lowerCaseQuery)),
    )
  }
}

// Export the singleton instance
export const TaskManager = TaskManagerClass.getInstance()
