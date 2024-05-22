import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherTodosListComponent } from './another-todos-list.component';

describe('AnotherTodosListComponent', () => {
  let component: AnotherTodosListComponent;
  let fixture: ComponentFixture<AnotherTodosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotherTodosListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnotherTodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
