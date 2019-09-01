import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserResponse } from '../../../shared/models/UserResponse';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit {
  signInView = true;
  isAuthFailed = false;
  isRegisterFailed = false;

  signInForm: FormGroup;
  signUpForm: FormGroup;

  signInEmail = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  signInPassword = new FormControl('', [
    Validators.required,
  ]);

  signUpLogin = new FormControl('', [
    Validators.minLength(5),
    Validators.required,
    Validators.pattern(/^[\w\s]+$/),
    // checkDuplicate()
  ]);
  signUpEmail = new FormControl('', [
    Validators.required,
    Validators.email,
    // checkDuplicate()
  ]);
  signUpPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  signUpConfirmPassword = new FormControl('', [
    this.checkPasswords(),
  ]);

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
  ) {

    this.signInForm = fb.group({
      signInEmail: this.signInEmail,
      signInPassword: this.signInPassword,
    });

    this.signUpForm = fb.group({
      signUpLogin: this.signUpLogin,
      signUpEmail: this.signUpEmail,
      signUpPassword: this.signUpPassword,
      signUpConfirmPassword: this.signUpConfirmPassword,
    });
  }

  ngOnInit() {
  }

  viewToggle() {
    this.signInView = !this.signInView;
  }

  checkPasswords(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return this.signUpPassword.value === control.value
        ? null : { passwordsMatchFail: { value: control.value } };
    };
  }

  submitSignInForm() {
    !this.signInForm.invalid && this.authService.login({
      email: this.signInForm.value.signInEmail,
      password: this.signInForm.value.signInPassword
    })
      .pipe(
        map((isAuthUserSuccess: boolean) => {
          this.isAuthFailed = !isAuthUserSuccess;
          return isAuthUserSuccess;
        }),
      ).subscribe();
  }

  submitSignUpForm() {
    !this.signUpForm.invalid && this.authService.register({
      login: this.signUpForm.value.signUpLogin,
      email: this.signUpForm.value.signUpEmail,
      password: this.signUpForm.value.signUpPassword,
    })
      .pipe(
        map((isAuthUserSuccess: boolean) => {
          this.isAuthFailed = !isAuthUserSuccess;
          return isAuthUserSuccess;
        }),
      ).subscribe();
  }

}
