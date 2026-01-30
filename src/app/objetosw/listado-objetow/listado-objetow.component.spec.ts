import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoObjetowComponent } from './listado-objetow.component';

describe('ListadoObjetowsComponent', () => {
  let component: ListadoObjetowComponent;
  let fixture: ComponentFixture<ListadoObjetowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoObjetowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoObjetowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

