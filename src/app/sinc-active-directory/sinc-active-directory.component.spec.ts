import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SincActiveDirectoryComponent } from './sinc-active-directory.component';

describe('SincActiveDirectoryComponent', () => {
  let component: SincActiveDirectoryComponent;
  let fixture: ComponentFixture<SincActiveDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SincActiveDirectoryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SincActiveDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
