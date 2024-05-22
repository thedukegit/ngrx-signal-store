import { Injectable } from '@angular/core';
import { TODOS } from '../model/mock-data';
import { Todo } from '../model/todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  async getAll(): Promise<Todo[]> {
    await sleep(1000); //simulate backend call
    return TODOS;
  }

  async add(todo: Partial<Todo>): Promise<Todo> {
    await sleep(1000); //simulate backend call
    return { ...todo, id: (Math.random() * 100).toString() } as Todo;
  }

  async delete(id: string) {
    await sleep(500); //simulate backend call
  }

  async update(id: string, completed: boolean) {
    await sleep(500); //simulate backend call
  }
}

async function sleep(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

