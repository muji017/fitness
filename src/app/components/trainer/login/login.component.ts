import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  loginForm!:FormGroup

  constructor( private formBuilder:FormBuilder ,
    private router:Router,
    private toastr:ToastrService,
    private service:TrainerService,
    private dialoge:MatDialog
    ){
     
  }

  ngOnInit(){
     this.loginForm=this.formBuilder.group({
       email: this.formBuilder.control('', [Validators.required,Validators.email]),
       password: this.formBuilder.control('',Validators.required)
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



   login(){
      const email:string=this.loginForm.get('email')?.value
      const password:string=this.loginForm.get('password')?.value
      if (!this.loginForm.valid) {

        if (this.emailValid()) {
          this.toastr.warning(this.emailValid())
          return
        }
        if (this.passwordValid()) {
          this.toastr.warning(this.passwordValid())
          return
        }
      }
      this.service.login(email,password).subscribe(
        (response)=>{
          console.log("api respons", response);
          const trainer={
            trainerToken:response.trainerToken,
            trainerId:response.trainerId
          }
          const trainerJSON = JSON.stringify(trainer);
          localStorage.setItem('trainerToken', trainerJSON);
          this.router.navigate(['/trainer/home'])
        }
        ,(error)=>{
          this.toastr.error(error.error.message)
        }
      )

   }


  resetPassword(){

  }
}
