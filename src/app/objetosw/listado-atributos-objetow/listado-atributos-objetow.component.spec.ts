import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAtributosObjetowComponent } from './listado-atributos-objetow.component';

describe('ListadoAtributosObjetowComponent', () => {
  let component: ListadoAtributosObjetowComponent;
  let fixture: ComponentFixture<ListadoAtributosObjetowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAtributosObjetowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoAtributosObjetowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

