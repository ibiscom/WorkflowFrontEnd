import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSimulacionComponent } from './listado-simulacion.component';

describe('ListadoSimulacionComponent', () => {
  let component: ListadoSimulacionComponent;
  let fixture: ComponentFixture<ListadoSimulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSimulacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoSimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

