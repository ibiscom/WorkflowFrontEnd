import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConsultarPorResponsableComponent } from './listado-consultarportarea.component';

describe('ListadoConsultarPorResponsableComponent', () => {
  let component: ListadoConsultarPorResponsableComponent;
  let fixture: ComponentFixture<ListadoConsultarPorResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoConsultarPorResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoConsultarPorResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

