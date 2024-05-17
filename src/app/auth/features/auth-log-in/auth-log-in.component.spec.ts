import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLogInComponent } from './auth-log-in.component';

describe('AuthLogInComponent', () => {
  let component: AuthLogInComponent;
  let fixture: ComponentFixture<AuthLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLogInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
