import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoConsultarRolResponsableComponent } from './listado-consultarrolresponsable.component';

describe('ListadoConsultarRolResponsableComponent', () => {
  let component: ListadoConsultarRolResponsableComponent;
  let fixture: ComponentFixture<ListadoConsultarRolResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoConsultarRolResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoConsultarRolResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
