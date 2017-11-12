import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstUserCredentialsComponent } from './first-user-credentials.component';

describe('FirstUserCredentialsComponent', () => {
  let component: FirstUserCredentialsComponent;
  let fixture: ComponentFixture<FirstUserCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstUserCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstUserCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
