// Strategy Pattern Implementation
import type { Task } from "@/types/Task"

class TaskSortingStrategyClass {
  public sortByDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      // Tasks without due dates go to the end
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
  }

  public sortByName(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
  }

  public sortById(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.id.localeCompare(b.id))
  }
}

export const TaskSortingStrategy = new TaskSortingStrategyClass()
