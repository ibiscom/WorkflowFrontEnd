import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAtributosAlarmasComponent } from './listado-alarmas.component';

describe('ListadoAtributosAlarmaComponent', () => {
  let component: ListadoAtributosAlarmaComponent;
  let fixture: ComponentFixture<ListadoAtributosAlarmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAtributosAlarmaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoAtributosAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

