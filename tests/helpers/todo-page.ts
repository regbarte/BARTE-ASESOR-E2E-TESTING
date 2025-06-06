import { Page } from '@playwright/test';

export class TodoPage {
  constructor(public readonly page: Page, private readonly url: string) {} 

  async goto() {
    await this.page.goto(this.url);
  }

  async addNewTodo(text: string) {
    await this.page.locator('input[placeholder="Enter task title..."]').type(text);
    await this.page.locator('button:has-text("Add Task")').click();
  }

  async toggleComplete(todoText: string) {
    const todoItem = this.page.locator(`.bg-white:has-text("${todoText}")`);
    await todoItem.locator('input[type="checkbox"]').check();
  }

  async deleteTodo(todoText: string) {
    const todoItem = this.page.locator(`.bg-white:has-text("${todoText}")`);
    await todoItem.locator('button svg[data-lucide="trash"]').click();
  }
}