import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiposIdentificacionComponent } from './listado-tipos-identificacion.component';

describe('ListadoTiposIdentificacionComponent', () => {
  let component: ListadoTiposIdentificacionComponent;
  let fixture: ComponentFixture<ListadoTiposIdentificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTiposIdentificacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoTiposIdentificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
