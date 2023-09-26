import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
      loginForm!:FormGroup
      errorMsg:string=""
      ngOnInit(): void {
        this.loginForm=new FormGroup({
           email:new FormControl('',[Validators.required,Validators.email]),
           password:new FormControl('',Validators.required)
        })

      }
      emailValid():string|void{
        const email:any=this.loginForm.get('email')
        if(email.touched&&!email.valid){
          if(email.errors.required){
            return  'Please enter your mail Id' 
          }
          else if(email.errors.email){
            return 'Email is Invalid'
          }
        }
        }
        passwordValid():string|void{
          const password:any=this.loginForm.get('password')
          if(password.touched&&!password.valid){
            if(password.errors.required){
              return  'Please enter your password' 
            }
          }
          }


      login(){
             if(!this.loginForm.valid){
              return
             }
      }
}
