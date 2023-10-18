import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  sendOtpForm!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service:AdminService,
    private dialoge:MatDialog
  ) {

  }

  ngOnInit() {
    this.sendOtpForm = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.required)
    }
    )
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
    // this.service.sendOtp(email).subscribe(
    //   (response)=>{
    //     this.dialoge.closeAll()
    //     this.dialoge.open(AdminOtpComponent, {

    //       enterAnimationDuration: 1200,
    //       exitAnimationDuration: 1200,
    //       data: data
    //     })

    //   }
    //   ,
    //   (error)=>{
    //     if(error.status==404){
    //       this.toastr.error(error.error.message)

    //     }
    //     else{
    //       this.toastr.error(error.error.message)
    //     }
    //   }
    // )
      }  }
}
