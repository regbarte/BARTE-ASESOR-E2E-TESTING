
import type { Task } from "@/types/Task"
import { BasicTask } from "./tasks/BasicTask"
import { TimedTask } from "./tasks/TimedTask"
import { ChecklistTask } from "./tasks/ChecklistTask"

interface TaskFactoryProps {
  type: string
  task: Task
  onDelete: () => void
  onComplete: () => void
}

export function TaskFactory({ type, task, onDelete, onComplete }: TaskFactoryProps) {
  switch (type) {
    case "basic":
      return <BasicTask task={task} onDelete={onDelete} onComplete={onComplete} />

    case "timed":
      return <TimedTask task={task} onDelete={onDelete} onComplete={onComplete} />

    case "checklist":
      return <ChecklistTask task={task} onDelete={onDelete} onComplete={onComplete} />

    default:
      return <BasicTask task={task} onDelete={onDelete} onComplete={onComplete} />
  }
}
