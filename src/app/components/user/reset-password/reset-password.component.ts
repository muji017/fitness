import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/userServices/user.service';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  sendOtpForm!:FormGroup
  em:string=''
 constructor(private dialoge:MatDialog , private service:UserService,
     private formBuilder:FormBuilder, private toastr:ToastrService
  ){}
  
  ngOnInit(){
       this.sendOtpForm=this.formBuilder.group({
        email:this.formBuilder.control('',Validators.required)
       })
       
  }

  sendOtp(){
    const email:string=this.sendOtpForm.get('email')?.value
    console.log(email)
    const data = {
      email: email,
      resetPass: true
    }
    this.service.sendOtp(email).subscribe(
      (response)=>{
        this.dialoge.closeAll()
        this.dialoge.open(OtpDialogComponent, {

          enterAnimationDuration: 1100,
          exitAnimationDuration: 1100,
          data: data
        })

      },
      (error)=>{
        if(error.status==404){
          this.toastr.error(error.error.message)

        }
        else{
          this.toastr.error(error.error.message)
        }
      }
    )
    
   
  }
  
}
