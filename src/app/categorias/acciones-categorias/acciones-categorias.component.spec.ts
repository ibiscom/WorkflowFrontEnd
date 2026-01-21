import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesCategoriasComponent } from './acciones-categorias.component';

describe('AccionesCategoriasComponent', () => {
  let component: AccionesCategoriasComponent;
  let fixture: ComponentFixture<AccionesCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionesCategoriasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccionesCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
