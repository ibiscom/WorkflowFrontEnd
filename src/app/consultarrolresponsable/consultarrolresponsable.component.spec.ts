import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarRolResponsableComponent } from './consultarrolresponsable.component';

describe('ConsultarRolResponsableComponent', () => {
  let component: ConsultarRolResponsableComponent;
  let fixture: ComponentFixture<ConsultarRolResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarRolResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarRolResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
