import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        SharedModule,
      ],
      providers: [AuthService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
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

  it('submit button should exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    const btn = compiled.querySelector('#login-submit-button') as HTMLButtonElement;
    expect(btn).toBeTruthy()
  })

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

  it('login should work', () => {
    component.login()
  })
});
