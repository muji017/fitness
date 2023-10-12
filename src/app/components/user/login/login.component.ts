import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/userServices/user.service';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup
  errorMsg: string = ""

  constructor(private service: UserService, private dialoge: MatDialog,
    private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router
  ) { }


  ngOnInit(): void {
    

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', Validators.required)
    })

  }
  emailValid(): any {
    const email: any = this.loginForm.get('email')
    if (!email.valid) {
      if (email.errors.required) {
        return 'Please enter your mail Id'
      }
      else if (email.errors.email) {
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
        console.log("api respons", response);

        
        this.toastr.success("Successfully loggedIn")
        const userJSON = JSON.stringify(response);
        localStorage.setItem('token', userJSON);
        this.router.navigate(['/home'])

      },
      (error) => {
        const data = {
          email: email
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