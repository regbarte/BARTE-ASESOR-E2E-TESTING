// Decorator Pattern Implementation
import type { ReactNode } from "react"
import type { Task } from "@/types/Task"
import { Bell } from "lucide-react"

interface TaskWithReminderProps {
  task: Task
  children: ReactNode
}

export function TaskWithReminder({ task, children }: TaskWithReminderProps) {
  if (!task.dueDate) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {children}
      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
        <Bell className="h-4 w-4" />
      </div>
    </div>
  )
}
