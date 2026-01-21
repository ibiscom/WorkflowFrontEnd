import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoResponsableComponent } from './listado-responsable.component';

describe('ListadoResponsableComponent', () => {
  let component: ListadoResponsableComponent;
  let fixture: ComponentFixture<ListadoResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoResponsableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
