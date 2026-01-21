import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLogAuditoriaComponent } from './listado-log-auditoria.component';

describe('ListadoLogAuditoriaComponent', () => {
  let component: ListadoLogAuditoriaComponent;
  let fixture: ComponentFixture<ListadoLogAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoLogAuditoriaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoLogAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
