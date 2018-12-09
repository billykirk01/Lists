import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFriendsComponent } from './current-friends.component';

describe('CurrentFriendsComponent', () => {
  let component: CurrentFriendsComponent;
  let fixture: ComponentFixture<CurrentFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
