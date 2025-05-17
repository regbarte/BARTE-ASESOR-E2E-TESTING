import { test, expect } from '@playwright/test';

test('should add a new task', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Verify the app loaded correctly
  await expect(page.locator('h1')).toHaveText('Task Manager');
  await expect(page.locator('input[name="taskName"]')).toBeVisible();
  await expect(page.locator('textarea[name="taskDescription"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
  await expect(page.locator('.task-list')).toBeVisible();
  await expect(page.locator('.task-list')).toHaveText('No tasks available');
  await expect(page.locator('.task-list')).toHaveCount(0);
  await expect(page.locator('.task-list')).toHaveClass(/empty/);
  await expect(page.locator('.task-list')).toHaveText('No tasks available');
  await expect(page.locator('.task-list')).toHaveCount(0);
  

  // Fill in the form
  const taskName = 'New Task';
  const taskDescription = 'This is a new task for testing.';
  await page.fill('input[name="taskName"]', taskName);
  await page.fill('textarea[name="taskDescription"]', taskDescription);
  await page.click('button[type="submit"]');

  // Verify the new task appears in the list
  const taskList = page.locator('.task-list');
  await expect(taskList).toContainText(taskName);
  await expect(taskList).toContainText(taskDescription);
});

test('should mark a task as completed', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Verify the app loaded correctly
  await expect(page.locator('h1')).toHaveText('To-Do List Application');

  const taskName = 'Task to Complete';
  const taskDescription = 'This task will be marked as completed';

  // Add a new task
  await page.fill('input[name="taskName"]', taskName);
  await page.fill('textarea[name="taskDescription"]', taskDescription);
  await page.click('button[type="submit"]');

  // Mark the task as completed
  await page.click(`text=${taskName} >> .. >> .complete-button`);

  // Verify the task is marked as completed
  const completedTask = page.locator(`text=${taskName} >> ..`);
  await expect(completedTask).toHaveClass(/completed/);
});
