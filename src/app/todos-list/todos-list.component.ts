import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [CommonModule, MatFormField, MatIcon, MatLabel, MatButtonToggle, MatButtonToggleGroup, MatSelectionList, MatListOption, MatInput, MatProgressSpinner],
  providers: [TodosStore],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.css'
})
export class TodosListComponent implements OnInit {
  store = inject(TodosStore);
  filter = viewChild.required(MatButtonToggleGroup); // YES, you can create a signal from a ViewChild

  public constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  ngOnInit(): void {
    this.loadTodos().then(() => console.log('todoos loaded'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }

  async onAddTodo(value: string) {
    await this.store.add(value);
  }

  async onDelete(id: string, event: Event) {
    event.stopPropagation();
    await this.store.delete(id);
  }

  async onTodoToggled(id: string, completed: boolean) {
    await this.store.update(id, completed);
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
