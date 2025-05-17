# Test info

- Name: should mark a task as completed
- Location: C:\Users\Client\E2E TEST\BARTE-ASESOR-E2E-TESTING\tests\todo.spec.ts:32:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: locator('h1')
Expected string: "To-Do List Application"
Received string: "Task Manager"
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for locator('h1')
    8 × locator resolved to <h1 class="text-4xl font-bold text-center text-gray-800">Task Manager</h1>
      - unexpected value "Task Manager"

    at C:\Users\Client\E2E TEST\BARTE-ASESOR-E2E-TESTING\tests\todo.spec.ts:36:36
```

# Page snapshot

```yaml
- heading "Task Manager" [level=1]
- heading "Add New Task" [level=2]
- textbox "Enter task title..."
- combobox: Basic
- button "Add Task"
- combobox: Sort by Date
- checkbox "gym"
- text: gym
- img
- text: "Due: 5/15/2025, 2:00:00 PM"
- button:
  - img
- img
- img
- text: You have passed the deadline for this task.
- checkbox "To do today"
- text: To do today
- img
- text: Checklist
- list:
  - listitem:
    - checkbox "sports"
    - text: sports
  - listitem:
    - checkbox "PSSE"
    - text: PSSE
  - listitem:
    - checkbox "components"
    - text: components
  - listitem:
    - checkbox "Laundry day"
    - text: Laundry day
- button:
  - img
- checkbox "midterms"
- text: midterms
- button:
  - img
- button "Open Next.js Dev Tools":
  - img
- alert
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('should add a new task', async ({ page }) => {
   4 |   await page.goto('http://localhost:3000');
   5 |
   6 |   // Verify the app loaded correctly
   7 |   await expect(page.locator('h1')).toHaveText('Task Manager');
   8 |   await expect(page.locator('input[name="taskName"]')).toBeVisible();
   9 |   await expect(page.locator('textarea[name="taskDescription"]')).toBeVisible();
  10 |   await expect(page.locator('button[type="submit"]')).toBeVisible();
  11 |   await expect(page.locator('.task-list')).toBeVisible();
  12 |   await expect(page.locator('.task-list')).toHaveText('No tasks available');
  13 |   await expect(page.locator('.task-list')).toHaveCount(0);
  14 |   await expect(page.locator('.task-list')).toHaveClass(/empty/);
  15 |   await expect(page.locator('.task-list')).toHaveText('No tasks available');
  16 |   await expect(page.locator('.task-list')).toHaveCount(0);
  17 |   
  18 |
  19 |   // Fill in the form
  20 |   const taskName = 'New Task';
  21 |   const taskDescription = 'This is a new task for testing.';
  22 |   await page.fill('input[name="taskName"]', taskName);
  23 |   await page.fill('textarea[name="taskDescription"]', taskDescription);
  24 |   await page.click('button[type="submit"]');
  25 |
  26 |   // Verify the new task appears in the list
  27 |   const taskList = page.locator('.task-list');
  28 |   await expect(taskList).toContainText(taskName);
  29 |   await expect(taskList).toContainText(taskDescription);
  30 | });
  31 |
  32 | test('should mark a task as completed', async ({ page }) => {
  33 |   await page.goto('http://localhost:3000');
  34 |
  35 |   // Verify the app loaded correctly
> 36 |   await expect(page.locator('h1')).toHaveText('To-Do List Application');
     |                                    ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
  37 |
  38 |   const taskName = 'Task to Complete';
  39 |   const taskDescription = 'This task will be marked as completed';
  40 |
  41 |   // Add a new task
  42 |   await page.fill('input[name="taskName"]', taskName);
  43 |   await page.fill('textarea[name="taskDescription"]', taskDescription);
  44 |   await page.click('button[type="submit"]');
  45 |
  46 |   // Mark the task as completed
  47 |   await page.click(`text=${taskName} >> .. >> .complete-button`);
  48 |
  49 |   // Verify the task is marked as completed
  50 |   const completedTask = page.locator(`text=${taskName} >> ..`);
  51 |   await expect(completedTask).toHaveClass(/completed/);
  52 | });
  53 |
```