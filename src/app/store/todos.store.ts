import { Todo } from '../model/todo.model';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { TodosService } from '../services/todos.service';
import { computed, inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

import { v4 as uuid } from 'uuid';

export type TodosFilter = 'all' | 'completed' | 'pending';


type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'all'
};

export const TodosStore = signalStore(
  // { providedIn: 'root' },
  withState(initialState),
  withDevtools(`Todos-${uuid()}`),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadAll() {
      patchState(store, { loading: true });
      const todos = await todosService.getAll();
      patchState(store, { todos, loading: false });
    },
    async add(title: string) {
      patchState(store, { loading: true });
      const newTodo = await todosService.add({ title, completed: false });
      patchState(store, (state) => ({
          todos: [...state.todos, newTodo],
          loading: false
        })
      );
    },
    async delete(id: string) {
      patchState(store, { loading: true });
      await todosService.delete(id);
      patchState(store, (state) => ({
          todos: [...state.todos.filter((todo) => todo.id !== id)],
          loading: false
        })
      );
    },
    async update(id: string, completed: boolean) {
      await todosService.update(id, completed);
      patchState(store, (state) => ({
          todos: state.todos.map(todo => todo.id === id ? { ...todo, completed } : todo)
        })
      );
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    }
  })),
  withComputed((state) => ({
      filteredTodos: computed(() => {
        const todos = state.todos();
        switch (state.filter()) {
          case 'all':
            return todos;
          case 'pending':
            return todos.filter((todo) => !todo.completed);
          case 'completed':
            return todos.filter((todo) => todo.completed);
        }

      })
    }
  ))
);