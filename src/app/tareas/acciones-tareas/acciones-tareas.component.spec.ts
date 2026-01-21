import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesTareasComponent } from './acciones-tareas.component';

describe('AccionesTareasComponent', () => {
  let component: AccionesTareasComponent;
  let fixture: ComponentFixture<AccionesTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesTareasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
