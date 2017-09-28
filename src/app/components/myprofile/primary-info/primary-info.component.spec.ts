import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryInfoComponent } from './primary-info.component';

describe('PrimaryInfoComponent', () => {
  let component: PrimaryInfoComponent;
  let fixture: ComponentFixture<PrimaryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
