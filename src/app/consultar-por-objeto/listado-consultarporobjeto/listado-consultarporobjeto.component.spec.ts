import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConsultarPorObjetoComponent } from './listado-consultarporobjeto.component';

describe('ListadoConsultarPorObjetoComponent', () => {
  let component: ListadoConsultarPorObjetoComponent;
  let fixture: ComponentFixture<ListadoConsultarPorObjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoConsultarPorObjetoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoConsultarPorObjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

