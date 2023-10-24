import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/adminServices/admin.service';
import { AdminOtpComponent } from '../admin-otp/admin-otp.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  sendOtpForm!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service:AdminService,
    private dialoge:MatDialog
  ) {

  }

  ngOnInit() {
    this.sendOtpForm = this.formBuilder.group({
      email: this.formBuilder.control('',[Validators.required ,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')])
    }
    )
  }
  emailValid(): any {
    const email: any = this.sendOtpForm.get('email')
    if (!email.valid) {
      if (email.errors.required) {
        return 'Please enter your mail Id'
      }
      else if (email.errors.pattern) {
        return 'Email is Invalid'
      }
    }
  }

  sendOtp() {

    if (!this.sendOtpForm.valid) {
      this.toastr.warning("Enter your email")
      return
    }
    else{
    const email=this.sendOtpForm.get('email')?.value
    const data={
      email:email
    }
    this.service.sendOtp(email).subscribe(
      (response)=>{
        this.dialoge.closeAll()
        this.dialoge.open(AdminOtpComponent, {

          enterAnimationDuration: 1200,
          exitAnimationDuration: 1200,
          data: data
        })

      }
      ,
      (error)=>{
        if(error.status==404){
          this.toastr.error(error.error.message)

        }
        else{
          this.toastr.error(error.error.message)
        }
      }
    )
      }  }
}
