import { test, expect, Page } from '@playwright/test';
import { TodoPage } from './helpers/todo-page';

const TODO_APP_URL = 'http://localhost:3000';

test.describe('Todo List Functionality', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page, TODO_APP_URL); 
    await todoPage.goto();
  });

  test('should add a new basic todo', async ({ page }) => {
    await todoPage.addNewTodo('Study');
    await expect(page.locator(`#task-:has-text("Study") + label`)).toBeVisible();
  });

  test('should complete a todo', async ({ page }) => {
    await todoPage.addNewTodo('Code');
    const checkbox = page.locator(`#task-:has-text("Code")`);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await expect(page.locator(`#task-:has-text("Code") + label`)).toHaveClass('line-through');
  });

  test('should delete a todo', async ({ page }) => {
    await todoPage.addNewTodo('Sleep');
    const todoItem = page.locator(`.bg-white:has-text("Sleep")`);
    await todoItem.locator('button svg[data-lucide="trash"]').click();
    await expect(todoItem).toBeHidden();
  });

  test('should persist added tasks on page reload', async ({ page }) => {
    const newTaskTitle = 'Remember groceries';
    await todoPage.addNewTodo(newTaskTitle);
    await expect(page.locator(`#task-:has-text("${newTaskTitle}") + label`)).toBeVisible();

    await page.reload();

    await expect(page.locator(`#task-:has-text("${newTaskTitle}") + label`)).toBeVisible({ timeout: 5000 });
  });
});