// Adapter Pattern Implementation
import type { Task, ExternalTask } from "@/types/Task"

class TaskAdapterClass {
  public adaptTask(externalTask: ExternalTask): Task {
    // Convert external task format to our internal Task format
    return {
      id: externalTask.id,
      title: externalTask.title,
      type: externalTask.type || "basic",
      description: externalTask.description,
      dueDate: externalTask.dueDate,
      completed: externalTask.completed || false,
      items: externalTask.items,
    }
  }
}

export const TaskAdapter = new TaskAdapterClass()
