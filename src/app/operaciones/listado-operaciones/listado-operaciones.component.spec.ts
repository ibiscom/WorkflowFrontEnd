import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoOperacionesComponent } from './listado-operaciones.component';

describe('ListadoOperacionesComponent', () => {
  let component: ListadoOperacionesComponent;
  let fixture: ComponentFixture<ListadoOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoOperacionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
