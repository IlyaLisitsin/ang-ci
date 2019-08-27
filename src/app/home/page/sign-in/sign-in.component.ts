import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { map } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signIn = true;
  signInFailedMessage = false;

  signInForm: any;
  signInEmail = new FormControl('');
  signInPassword = new FormControl('');

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
  ) {

    this.signInForm = fb.group({
      signInEmail: this.signInEmail,
      signInPassword: this.signInPassword,
    });

  }

  ngOnInit() {
  }

  viewToggle() {
    this.signIn = !this.signIn;
  }

  submitSignInForm() {
    this.authService.login({
      email: this.signInForm.value.signInEmail,
      password: this.signInForm.value.signInPassword
    })
    .pipe(
      map((isSuccess: boolean) => {
        this.signInFailedMessage = !isSuccess;
      }),
    ).subscribe();
  }

}
