import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';

@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.css']
})
export class EnterNewPasswordComponent {
  setPasswordForm!:FormGroup
  email!:string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private service:TrainerService,
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
        const trainer={
          trainerToken:response.trainerToken,
          trainerId:response.trainerId
        }
        const trainerJSON = JSON.stringify(trainer);
        localStorage.setItem('trainertoken', trainerJSON);
        this.toastr.success("Password updated succesfully")
        this.router.navigate(['/trainer/home'])

      },
      (error) => {
        // Handle error
        this.toastr.error(error.error.message);

      }
    );

  }
}
