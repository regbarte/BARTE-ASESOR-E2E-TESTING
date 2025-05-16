import { Page } from '@playwright/test';

export class TodoPage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:3000');
  }

  async addNewTodo(text: string) {
    await this.page.locator('.new-todo').type(text);
    await this.page.locator('.new-todo').press('Enter');
  }

  async toggleComplete(todoText: string) {
    const todoItem = this.page.locator(`[data-testid="task-card"]:has-text("${todoText}")`);
    await todoItem.locator('[data-testid="task-checkbox"]').check();
  }

  async deleteTodo(todoText: string) {
    const todoItem = this.page.locator(`[data-testid="task-card"]:has-text("${todoText}")`);
    await todoItem.hover();
    await todoItem.locator('[data-testid="delete-button"]').click();
  }

}