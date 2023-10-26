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
import { UsertrainerslistComponent } from './usertrainerslist/usertrainerslist.component';
import { BmicalculatorComponent } from './bmicalculator/bmicalculator.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserTrainerProfileComponent } from './user-trainer-profile/user-trainer-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginAuthGuard, UserhomeAuthGuard } from 'src/app/auth/user.guard';
import { SetUserPasswordComponent } from './set-user-password/set-user-password.component';
import { ViewDietPlanComponent } from './view-diet-plan/view-diet-plan.component';
import { ViewDietPlanDetailsComponent } from './view-diet-plan-details/view-diet-plan-details.component';
import { VideosComponent } from './videos/videos.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [UserLoginAuthGuard], },
    { path: 'signup', component: SignupComponent, canActivate: [UserLoginAuthGuard] },
    { path: "home", component: HomeComponent, },
    { path: "bmicalculator", component: BmicalculatorComponent },
    { path: "trainers", component: UsertrainerslistComponent },
    { path: "trainersprofile/:trainerId", component: UserTrainerProfileComponent },
    { path: "subscription", component: SubscriptionComponent, canActivate: [UserhomeAuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [UserhomeAuthGuard] },
    { path: 'dietplans', component: ViewDietPlanComponent },
    { path: "viewdietplans/:planId", component: ViewDietPlanDetailsComponent, canActivate: [UserhomeAuthGuard] },
    { path: "videos", component: VideosComponent },
    { path:"videoplayer",component:VideoPlayerComponent},

   { path: '*', redirectTo: 'login', pathMatch: 'full', }
  ]
}]

@NgModule({
  declarations: [
    // OtpDialogComponent



    SetUserPasswordComponent,
 


  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,


    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
