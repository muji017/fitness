import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { TrainerLoginAuthGuard, TrainerhomeAuthGuard } from 'src/app/auth/trainer.guard';
import { EnterNewPasswordComponent } from './enter-new-password/enter-new-password.component';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { TrainerDietPlanComponent } from './trainer-diet-plan/trainer-diet-plan.component';
import { AddDietPlanComponent } from './add-diet-plan/add-diet-plan.component';
import { EditDietPlanComponent } from './edit-diet-plan/edit-diet-plan.component';
import { TrainerVideosListComponent } from './trainer-videos-list/trainer-videos-list.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { EditVideoComponent } from './edit-video/edit-video.component';
import { ChatWithUserComponent } from './chat-with-user/chat-with-user.component';

const routes:Routes=[
  {
    path:'',
    children:[
      {
        path:'',redirectTo:'login',pathMatch:'full'
      },
      {
        path:'login',component:LoginComponent,canActivate:[TrainerLoginAuthGuard]
      },
      {
        path:'home',component:HomeComponent,canActivate:[TrainerhomeAuthGuard]
      },
      {
        path:'dietplans',component:TrainerDietPlanComponent,canActivate:[TrainerhomeAuthGuard]
      },
      {
        path:'profile',component:TrainerProfileComponent,canActivate:[TrainerhomeAuthGuard]
      },
      {
        path:'videos',component:TrainerVideosListComponent,canActivate:[TrainerhomeAuthGuard]
      },
      {
        path:'chat',component:ChatWithUserComponent,canActivate:[TrainerhomeAuthGuard]
      }
    ]
  }
]


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    ForgetPasswordComponent,
    EnterOtpComponent,
    EnterNewPasswordComponent,
    TrainerProfileComponent,
    TrainerDietPlanComponent,
    AddDietPlanComponent,
    EditDietPlanComponent,
    TrainerVideosListComponent,
    AddVideoComponent,
    VideoPlayerComponent,
    EditVideoComponent,
    ChatWithUserComponent
  ],
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TrainerModule { }
