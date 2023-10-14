import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
// import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserGuard } from 'src/app/auth/user.guard';
import { UsertrainerslistComponent } from './usertrainerslist/usertrainerslist.component';
import { BmicalculatorComponent } from './bmicalculator/bmicalculator.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserTrainerProfileComponent } from './user-trainer-profile/user-trainer-profile.component';

const routes:Routes=[{
  path:'',
  children:[
  {path: '', redirectTo :'login',pathMatch: 'full'},
  {path: 'login',component:LoginComponent,canActivate: [UserGuard],},
  {path: 'signup',component:SignupComponent,canActivate: [UserGuard]},
  { path:"home",component:HomeComponent,},
  {path:"bmicalculator",component:BmicalculatorComponent},
  {path:"trainers",component:UsertrainerslistComponent},
  {path:"trainersprofile/:trainerId",component:UserTrainerProfileComponent}

  ]
}]

@NgModule({
  declarations: [
    // OtpDialogComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    
    
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
