import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { of, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';
import { MockInstance, MockProvider } from 'ng-mocks';
class RouterMock {
  navigate(params: Parameters<Router['navigate']>) {}
}

describe('LoginPageComponent', () => {
  MockInstance.scope();
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginSpy: jasmine.Spy;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [
        SessionService,
        MockProvider(AuthService, {
          login: () => of(
            new User(
              1,
              'fake@email.com',
              'fakeName',
              'fakeLastName',
              'fakeAvatar'
            )
          ).pipe(
            tap((user) => TestBed.inject(SessionService).setUser(user))
          )
        }),
        MockProvider(Router)
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    loginSpy = spyOn(TestBed.inject(AuthService), 'login').and.callThrough()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should not be valid if email and password are empty', () => {
    const form = component.form
    form.setValue({
      email: '',
      password: ''
    });
    expect(form.valid).toBe(false)
  })

  it('should call login from AuthService', () => {
    const form = component.form
    form.setValue({
      email: 'test@email.com',
      password: '123456'
    });
    component.login();
    expect(loginSpy).toHaveBeenCalled()
  })

  it('login should not be executed if form is not valid', () => {
    const form = component.form
    form.setValue({
      email: '',
      password: ''
    });
    component.login();
    expect(form.invalid).toBeTrue();
    expect(loginSpy).not.toHaveBeenCalled();
  })

  // PRUEBAS DE INTEGRACIÓN 🤔
  it('should redirect if user$ emit a User', () => {
    const navigateSpy = spyOn(component.router, 'navigate');
    component.login();
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard', 'students'])
  })

  // PRUEBAS DE INTEGRACIÓN 🤔
  it('submit button should exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    const btn = compiled.querySelector('#login-submit-button') as HTMLButtonElement;
    expect(btn).toBeTruthy()
  })

  // PRUEBAS DE INTEGRACIÓN 🤔
  it('submit button should be disabled if form is not valid', () => {
    const form = component.form
    form.setValue({
      email: '',
      password: ''
    });
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const btn = compiled.querySelector('#login-submit-button') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  })
});
