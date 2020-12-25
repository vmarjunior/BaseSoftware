import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoverComponent } from './account-recover.component';

describe('AccountRecoverComponent', () => {
  let component: AccountRecoverComponent;
  let fixture: ComponentFixture<AccountRecoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRecoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
