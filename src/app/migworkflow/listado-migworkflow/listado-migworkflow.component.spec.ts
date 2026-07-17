import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMigworkflowComponent } from './listado-migworkflow.component';

describe('ListadoMigworkflowComponent', () => {
  let component: ListadoMigworkflowComponent;
  let fixture: ComponentFixture<ListadoMigworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoMigworkflowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoMigworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
