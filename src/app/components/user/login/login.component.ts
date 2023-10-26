import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/userServices/user.service';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Store } from '@ngrx/store';
import { loginStart } from 'src/app/store/action';
import { getLoginSuccess } from 'src/app/store/selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  errorMsg: string = ""

  constructor(private service: UserService, private dialoge: MatDialog,
    private store: Store<any>,
    private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router
  ) { }


  ngOnInit(): void {


    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, 
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: this.formBuilder.control('', Validators.required)
    })

  }
  emailValid(): any {
    const email: any = this.loginForm.get('email')
    if (!email.valid) {
      if (email.errors.required) {
        return 'Please enter your mail Id'
      }
      else if (email.errors.pattern) {
        return 'Email is Invalid'
      }
    }
  }
  passwordValid(): any {
    const password: any = this.loginForm.get('password')
    if (!password.valid) {
      if (password.errors.required) {
        return 'Please enter your password'
      }
    }
  }

  //  login 
  login() {
    if (!this.loginForm.valid) {

      if (this.emailValid()) {
        this.toastr.warning(this.emailValid())
        return
      }
      if (this.passwordValid()) {
        this.toastr.warning(this.passwordValid())
        return
      }
      return
    }
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value

    this.service.login(email, password).subscribe(
      (response) => {
        this.toastr.success("Successfully loggedIn")
        const userJSON = JSON.stringify(response);
        localStorage.setItem('usertoken', userJSON);
        this.router.navigate(['/home'])

      },
      (error) => {
        const data = {
          email: email,
          resetPass:false
        }
        if (error.status == 403) {
          this.dialoge.open(OtpDialogComponent, {
            enterAnimationDuration: 1200,
            exitAnimationDuration: 1200,
            data: data
          })

        }
        else {
          this.toastr.error(error.error.message)
        }


      }
    )

  }
  resetPassword() {
    this.dialoge.open(ResetPasswordComponent, {
      enterAnimationDuration: 1200,
      exitAnimationDuration: 1200,

    })

  }

}