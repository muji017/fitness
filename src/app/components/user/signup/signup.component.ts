import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

   signUpForm!:FormGroup
   ngOnInit():void{
     this.signUpForm=new FormGroup({
        name:new FormControl('',[Validators.required,Validators.minLength(2)]),
        email:new FormControl('',[Validators.required,Validators.email]),
        password:new FormControl('',[Validators.required,Validators.minLength(6)]),
        repassword:new FormControl('',Validators.required,)
     },{

     })
   }


  showNameError():any  {
     
    const name:any= this.signUpForm.get('name');
    if (name.touched && !name.valid) {
      if (name.errors.required) {
        return 'Name is required';
      }

      if (name.errors.minlength) {
        return 'Name should be of minimum 2 characters';
      }
    }
  }
  showEmailError():any  {
     
    const email:any= this.signUpForm.get('email');
    if (email.touched && !email.valid) {
      if (email.errors.required) {
        return 'Email is required';
      }
      if (email.errors.email){
        return 'Invalid Email'
      }
    }
  }

  showPasswordError():any  {
     
    const password:any= this.signUpForm.get('password');
    if (password.touched && !password.valid) {
      if (password.errors.required) {
        return 'Password is required';
      }

      if (password.errors.minlength) {
        return 'Password should be of minimum 6 characters';
      }
    }
  }

  showReEnterPasswordError(): any {
    const repassword = this.signUpForm.get('repassword');
    const password:any= this.signUpForm.get('password');
    if (repassword?.touched && !repassword?.valid) {
      if (repassword?.hasError('required')) {
        return 'Password is required';
      }
    }
  }
  
   signUp(){
         if(!this.signUpForm.valid){
          return
         }
   }
}
