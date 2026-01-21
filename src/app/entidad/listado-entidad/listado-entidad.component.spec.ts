import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEntidadComponent } from './listado-entidad.component';

describe('ListadoEntidadComponent', () => {
  let component: ListadoEntidadComponent;
  let fixture: ComponentFixture<ListadoEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoEntidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
