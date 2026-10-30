import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConsultarPorFlujoComponent } from './listado-consultarporflujo.component';

describe('ListadoConsultarPorFlujoComponent', () => {
  let component: ListadoConsultarPorFlujoComponent;
  let fixture: ComponentFixture<ListadoConsultarPorFlujoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoConsultarPorFlujoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoConsultarPorFlujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

