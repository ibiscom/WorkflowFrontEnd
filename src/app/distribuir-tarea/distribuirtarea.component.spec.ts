import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuirtareaComponent } from './distribuirtarea.component';

describe('DistribuirtareaComponent', () => {
  let component: DistribuirtareaComponent;
  let fixture: ComponentFixture<DistribuirtareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistribuirtareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DistribuirtareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

