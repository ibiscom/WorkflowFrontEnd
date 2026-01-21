import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSesionesComponent } from './listado-sesiones.component';

describe('ListadoSesionesComponent', () => {
  let component: ListadoSesionesComponent;
  let fixture: ComponentFixture<ListadoSesionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSesionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoSesionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
