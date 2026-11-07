import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConsultarPorTareaComponent } from './listado-consultarportarea.component';

describe('ListadoConsultarPorTareaComponent', () => {
  let component: ListadoConsultarPorTareaComponent;
  let fixture: ComponentFixture<ListadoConsultarPorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoConsultarPorTareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoConsultarPorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

