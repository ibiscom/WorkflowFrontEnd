import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAlarmasComponent } from './listado-alarmas.component';

describe('ListadoAlarmasComponent', () => {
  let component: ListadoAlarmasComponent;
  let fixture: ComponentFixture<ListadoAlarmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAlarmasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoAlarmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

