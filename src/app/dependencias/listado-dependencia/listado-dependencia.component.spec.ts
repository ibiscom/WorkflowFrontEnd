import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDependenciaComponent } from './listado-dependencia.component';

describe('ListadoDependenciaComponent', () => {
  let component: ListadoDependenciaComponent;
  let fixture: ComponentFixture<ListadoDependenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDependenciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoDependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
