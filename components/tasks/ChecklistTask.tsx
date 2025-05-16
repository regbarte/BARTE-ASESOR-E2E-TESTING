"use client"

import { useState } from "react"
import type { Task } from "@/types/Task"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash, ListChecks } from "lucide-react"
import { TaskWithReminder } from "../decorators/TaskWithReminder"

interface ChecklistTaskProps {
  task: Task
  onDelete: () => void
  onComplete: () => void
}

export function ChecklistTask({ task, onDelete, onComplete }: ChecklistTaskProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const handleItemCheck = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const TaskComponent = (
    <Card className={`${task.completed ? "opacity-60" : ""}`}>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Checkbox id={`task-${task.id}`} checked={task.completed} onCheckedChange={onComplete} />
          <label htmlFor={`task-${task.id}`} className={`font-medium ${task.completed ? "line-through" : ""}`}>
            {task.title}
          </label>
        </div>
        {task.description && <p className="mb-3 text-sm text-muted-foreground">{task.description}</p>}

        {task.items && task.items.length > 0 && (
          <div className="border rounded-md p-2">
            <div className="flex items-center gap-1 mb-2 text-sm font-medium">
              <ListChecks className="h-4 w-4" />
              <span>Checklist</span>
            </div>
            <ul className="space-y-2">
              {task.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Checkbox
                    id={`item-${task.id}-${index}`}
                    checked={checkedItems[item] || false}
                    onCheckedChange={() => handleItemCheck(item)}
                  />
                  <label
                    htmlFor={`item-${task.id}-${index}`}
                    className={`text-sm ${checkedItems[item] ? "line-through text-muted-foreground" : ""}`}
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>
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
