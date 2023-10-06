import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { SetPasswordComponent } from '../set-password/set-password.component';

@Component({
  selector: 'app-admin-otp',
  templateUrl: './admin-otp.component.html',
  styleUrls: ['./admin-otp.component.css']
})
export class AdminOtpComponent {

  countdown: number = 60
  timerInterval: any
  email!: string
  otpForm!:FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBulider: FormBuilder, private service:AdminService, private router:Router,
    private toastr:ToastrService, private dialoge:MatDialog
  ) {

    this.email = data.email
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
       const otp:string=this.otpForm.get('otp')?.value
       console.log(otp)
       this.service.verifyOtp(this.email,otp).subscribe(
        (response)=>{
          const email=response.email
          const data={
            email:email
          }
          this.dialoge.closeAll()
        this.dialoge.open(SetPasswordComponent, {

          enterAnimationDuration: 1200,
          exitAnimationDuration: 1200,
          data: data
        })
        },
        (error)=>{
              if(error.status==401){
                this.toastr.error(error.error.message)

              }
              else{
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
    (response)=>{
      console.log(response)
          this.countdown=60
          this.clearTimerInterval(); 
          this.startCountdown(); 
    },
    (error)=>{
      this.toastr.error(error)
    }
   )
  }
 
}
