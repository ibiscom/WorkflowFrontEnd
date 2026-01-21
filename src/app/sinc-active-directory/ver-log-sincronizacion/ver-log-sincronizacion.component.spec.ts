import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerLogSincronizacionComponent } from './ver-log-sincronizacion.component';

describe('VerLogSincronizacionComponent', () => {
  let component: VerLogSincronizacionComponent;
  let fixture: ComponentFixture<VerLogSincronizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerLogSincronizacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerLogSincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
