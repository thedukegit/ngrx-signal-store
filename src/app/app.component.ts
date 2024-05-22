import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { JsonPipe } from '@angular/common';
import { TodosListComponent } from './todos-list/todos-list.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnotherTodosListComponent } from './todos-list/another-todos-list.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, JsonPipe, TodosListComponent, MatProgressSpinner, AnotherTodosListComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngrx-signal';


}
