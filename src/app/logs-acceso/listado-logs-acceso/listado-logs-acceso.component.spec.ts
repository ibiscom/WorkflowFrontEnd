import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLogsAccesoComponent } from './listado-logs-acceso.component';

describe('ListadoLogsAccesoComponent', () => {
  let component: ListadoLogsAccesoComponent;
  let fixture: ComponentFixture<ListadoLogsAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoLogsAccesoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoLogsAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
