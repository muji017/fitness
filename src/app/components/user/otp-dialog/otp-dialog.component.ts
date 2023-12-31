import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userServices/user.service';
import { ToastrService } from 'ngx-toastr';
import { SetUserPasswordComponent } from '../set-user-password/set-user-password.component';


@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OtpDialogComponent {

  otpForm!: FormGroup
  countdown: number = 60
  timerInterval: any
  email!: string
  resetPass!: boolean

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBulider: FormBuilder, private service: UserService, private router: Router,
    private toastr: ToastrService, private dialoge: MatDialog
  ) {

    this.email = data.email
    this.resetPass = data.resetPass
  }

  ngOnInit() {
    this.otpForm = this.formBulider.group({
      otp: this.formBulider.control('', Validators.required),

    })
    this.startCountdown()
  }

  startCountdown() {
    this.clearTimerInterval();
    this.timerInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      }
    }, 1000);
  }


  submitOtp() {
    const otp: string = this.otpForm.get('otp')?.value
    console.log(otp)
    this.service.verifyOtp(this.email, otp).subscribe(
      (response) => {
        if (this.resetPass) {
          const data={
             email:this.email
          }
          this.dialoge.closeAll()
          this.dialoge.open(SetUserPasswordComponent, {
            enterAnimationDuration: 1100,
            exitAnimationDuration: 1100,
            data: data
          })
        }
        else {
          this.dialoge.closeAll()
          const userToken = JSON.stringify(response)
          localStorage.setItem('usertoken', userToken)
          this.toastr.success("successfully varified your email")
          this.router.navigate(['/home'])
        }
      },
      (error) => {
        if (error.status == 401) {
          this.toastr.error(error.error.message)

        }
        else {
          this.toastr.error(error.error.message)
        }
      }
    )
  }

  clearTimerInterval() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resendOtp() {
    this.service.resendOtp(this.email).subscribe(
      (response) => {
        this.countdown = 60
        this.clearTimerInterval();
        this.startCountdown();
      },
      (error) => {
        this.toastr.error(error.error.message)
      }
    )
  }

}
