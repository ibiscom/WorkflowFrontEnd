import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsAccesoComponent } from './logs-acceso.component';

describe('LogsAccesoComponent', () => {
  let component: LogsAccesoComponent;
  let fixture: ComponentFixture<LogsAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsAccesoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogsAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
