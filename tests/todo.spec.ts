import { test, expect } from '@playwright/test';
import { TodoPage } from './helpers/todo-page';

const TODO_APP_URL = 'http://localhost:3000';

test.describe('Todo List Functionality using POM', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('should add a new basic todo', async () => {
    await todoPage.addNewTodo('Study');
    await expect(todoPage.page.locator(`[data-testid="task-card"]:has-text("Buy milk") label`)).toBeVisible();
  });

  test('should complete a todo', async () => {
    await todoPage.addNewTodo('Code');
    await todoPage.toggleComplete('Code');
    await expect(todoPage.page.locator(`[data-testid="task-card"]:has-text("Walk the cat")`)).toHaveClass('opacity-60');
  });

  test('should delete a todo', async () => {
    await todoPage.addNewTodo('Sleep');
    await todoPage.deleteTodo('Sleep');
    await expect(todoPage.page.locator(`[data-testid="task-card"]:has-text("Clean the house")`)).toBeHidden();
  });
});