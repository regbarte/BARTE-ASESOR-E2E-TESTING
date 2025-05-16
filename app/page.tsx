"use client";

import { useState, useEffect } from "react";
import { TaskFactory } from "@/components/TaskFactory";
import { TaskManager } from "@/lib/TaskManager";
import { TaskAdapter } from "@/lib/TaskAdapter";
import { TaskSortingStrategy } from "@/lib/TaskSortingStrategy";
import { Notification } from "@/components/Notification";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Task } from "@/types/Task";

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState("basic");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [sortStrategy, setSortStrategy] = useState("date");
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const mockData = [
          { id: "1", title: "midterms", type: "basic", completed: false },
          { id: "2", title: "gym", type: "timed", dueDate: "2025-05-15T14:00:00", completed: false },
          { id: "3", title: "To do today", type: "checklist", items: ["sports", "PSSE", "components", "Laundry day"], completed: false },
        ];

        const adaptedTasks = mockData.map((task) => TaskAdapter.adaptTask(task));
        setTasks(adaptedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    let sorted: Task[] = [];
    switch (sortStrategy) {
      case "date":
        sorted = TaskSortingStrategy.sortByDate([...tasks]);
        break;
      case "name":
        sorted = TaskSortingStrategy.sortByName([...tasks]);
        break;
      case "id":
        sorted = TaskSortingStrategy.sortById([...tasks]);
        break;
      default:
        sorted = [...tasks];
    }
    setSortedTasks(sorted);
  }, [tasks, sortStrategy]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      type: newTaskType,
      completed: false,
    };

    if (newTaskType === "timed" && newTaskDueDate) {
      newTask.dueDate = newTaskDueDate;
    }

    TaskManager.addTask(newTask, setTasks);
    setNewTaskTitle("");
    setNewTaskDueDate("");
  };

  const isTaskOverdue = (task: Task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">To-Do List Application</h1>

        {/* Task Creation Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="col-span-2 border-gray-300 focus:ring-2 focus:ring-blue-500"
            />

            <Select value={newTaskType} onValueChange={setNewTaskType}>
              <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="timed">Timed</SelectItem>
                <SelectItem value="checklist">Checklist</SelectItem>
              </SelectContent>
            </Select>

            {newTaskType === "timed" && (
              <Input
                type="datetime-local"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="md:col-span-2 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            )}

            <Button onClick={handleAddTask} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full md:w-auto col-span-1">
              Add Task
            </Button>
          </div>
        </div>

        {/* Sorting Control */}
        <div className="flex justify-end">
          <Select value={sortStrategy} onValueChange={setSortStrategy}>
            <SelectTrigger className="w-[200px] border-gray-300 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="id">Sort by ID</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task List */}
        <div className="grid gap-4">
          {sortedTasks.map((task) => (
            <div key={task.id} className="relative bg-white p-4 rounded-lg shadow-md">
              <TaskFactory
                type={task.type}
                task={task}
                onDelete={() => TaskManager.removeTask(task.id, setTasks)}
                onComplete={() => TaskManager.toggleTaskCompletion(task.id, setTasks)}
              />
              {isTaskOverdue(task) && (
                <Notification>You have passed the deadline for this task.</Notification>
              )}
            </div>
          ))}

          {sortedTasks.length === 0 && (
            <div className="text-center p-4 bg-gray-200 rounded-lg text-gray-600">
              No tasks available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
