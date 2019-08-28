import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInView = true;
  isAuthFailed = false;

  signInForm: FormGroup;
  signUpForm: FormGroup;

  signInEmail = new FormControl('', [
    Validators.required,
    // Validators.email,
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
        ? { passwordsMatchFail: { value: control.value } } : null;
    };
  }

  submitSignInForm() {
    !this.signInForm.invalid && this.authService.login({
      email: this.signInForm.value.signInEmail,
      password: this.signInForm.value.signInPassword
    })
    .pipe(
      map((isSuccess: boolean) => {
        this.isAuthFailed = !isSuccess;
        return isSuccess;
      }),
    ).subscribe();
  }

}
