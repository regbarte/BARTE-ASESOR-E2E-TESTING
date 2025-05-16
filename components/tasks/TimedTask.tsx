"use client"

import type { Task } from "@/types/Task"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash, Clock } from "lucide-react"
import { TaskWithReminder } from "../decorators/TaskWithReminder"

interface TimedTaskProps {
  task: Task
  onDelete: () => void
  onComplete: () => void
}

export function TimedTask({ task, onDelete, onComplete }: TimedTaskProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const TaskComponent = (
    <Card className={`${task.completed ? "opacity-60" : ""}`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2">
          <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={onComplete} />
          <label htmlFor={`task-${task.id}`} className={`font-medium ${task.completed ? "line-through" : ""}`}>
            {task.title}
          </label>
        </div>
        {task.description && <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>}
        {task.dueDate && (
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )

 
  return task.dueDate ? <TaskWithReminder task={task}>{TaskComponent}</TaskWithReminder> : TaskComponent
}
