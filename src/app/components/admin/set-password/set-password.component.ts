import { Dialog } from '@angular/cdk/dialog';
import { Component , Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent {

  setPasswordForm!:FormGroup
  email!:string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private service:AdminService,
    private router:Router,
    private dialoge:MatDialog

  ){
    this.email=data.email
  }
ngOnInit(){
  this.setPasswordForm=this.formBuilder.group({     
     password: this.formBuilder.control('', [Validators.required, Validators.minLength(6),
    Validators.pattern('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]+$')]),
    repassword: this.formBuilder.control('', Validators.required,)
  })
}

showPasswordError(): any {

  const password: any = this.setPasswordForm.get('password');
  if (!password.valid) {
    if (password.errors.required) {
      return 'Password is required';
    }

    if (password.errors.minlength) {
      return 'Password should be of minimum 6 characters';
    }
    if(password.errors.pattern){
      return 'Password should contain atleast one character and a number'
    }
  }
}

showReEnterPasswordError(): any {
  const repassword = this.setPasswordForm.get('repassword');
  const password: any = this.setPasswordForm.get('password')?.value;
  if (!repassword?.valid) {
    if (repassword?.hasError('required')) {
      return 'Password is required';
    }
  }
}


  setPassword(){

    if(!this.setPasswordForm.valid){
      if (this.showPasswordError()) {
        this.toastr.warning(this.showPasswordError())
        return
      }
      if (this.showReEnterPasswordError()) {
        this.toastr.warning(this.showReEnterPasswordError())
        return
      }
      return
    }
    const repassword:string = this.setPasswordForm.get('repassword')?.value;
    const password: string = this.setPasswordForm.get('password')?.value
    if(repassword!==password){
      this.toastr.warning("Password mismatch")
      return
    }
    

    this.service.setPassword(this.email,password).subscribe(
      (response) => {
        // Handle successful response here
        this.dialoge.closeAll()
        const admin={
          adminToken:response.adminToken,
          adminId:response.adminId
        }
        const adminJSON = JSON.stringify(admin);
        localStorage.setItem('admintoken', adminJSON);
        this.toastr.success("Password updated succesfully")
        this.router.navigate(['/admin/home'])

      },
      (error) => {
        // Handle error
        this.toastr.error(error.error.message);

      }
    );

  }
}
