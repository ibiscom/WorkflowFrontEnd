import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoinicioComponent } from './eventoinicio.component';

describe('EventoinicioComponent', () => {
  let component: EventoinicioComponent;
  let fixture: ComponentFixture<EventoinicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoinicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventoinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
