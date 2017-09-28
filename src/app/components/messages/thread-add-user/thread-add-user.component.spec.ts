import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadAddUserComponent } from './thread-add-user.component';

describe('ThreadAddUserComponent', () => {
  let component: ThreadAddUserComponent;
  let fixture: ComponentFixture<ThreadAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
