import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';
import { EnterNewPasswordComponent } from '../enter-new-password/enter-new-password.component';

@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.css']
})
export class EnterOtpComponent {
  countdown: number = 60
  timerInterval: any
  email!: string
  otpForm!:FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBulider: FormBuilder, private service:TrainerService, private router:Router,
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
        this.dialoge.open(EnterNewPasswordComponent, {

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
