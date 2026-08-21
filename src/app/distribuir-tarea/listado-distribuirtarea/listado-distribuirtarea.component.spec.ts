import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDistribuirtareaComponent } from './listado-distribuirtarea.component';

describe('ListadoDistribuirtareaComponent', () => {
  let component: ListadoDistribuirtareaComponent;
  let fixture: ComponentFixture<ListadoDistribuirtareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDistribuirtareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoDistribuirtareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

