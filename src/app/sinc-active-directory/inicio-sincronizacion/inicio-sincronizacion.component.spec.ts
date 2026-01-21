import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSincronizacionComponent } from './inicio-sincronizacion.component';

describe('InicioSincronizacionComponent', () => {
  let component: InicioSincronizacionComponent;
  let fixture: ComponentFixture<InicioSincronizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioSincronizacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioSincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
