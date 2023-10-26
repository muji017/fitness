import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginAuthGuard, AdminhomeAuthGuard } from 'src/app/auth/admin.guard';
import { HeaderComponent } from './header/header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import { AdminOtpComponent } from './admin-otp/admin-otp.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { TrainerslistComponent } from './trainerslist/trainerslist.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { UserListComponent } from './user-list/user-list.component';
import { PlansComponent } from './plans/plans.component';
import { AddPlanComponent } from './add-plan/add-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { AdminDietPlanViewComponent } from './admin-diet-plan-view/admin-diet-plan-view.component';
import { VideosViewComponent } from './videos-view/videos-view.component';


const routes:Routes=[
  {
    path:'',
    children:[
      {
        path:'',redirectTo:'login',pathMatch:'full'
      },
      {
        path:'login',component:LoginComponent,canActivate:[AdminLoginAuthGuard]
      },
      {
        path:'home',component:HomeComponent,canActivate:[AdminhomeAuthGuard]
      },
      {
        path:'trainers',component:TrainerslistComponent,canActivate:[AdminhomeAuthGuard]
      },
      {
        path:'users',component:UserListComponent,canActivate:[AdminhomeAuthGuard]
      },
      {
        path:'plans',component:PlansComponent,canActivate:[AdminhomeAuthGuard]
      },
      {
        path:'dietplans',component:AdminDietPlanViewComponent,canActivate:[AdminhomeAuthGuard]
      },
    ]
  }
]


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SidenavComponent,
    HeaderComponent,
    ResetPasswordComponent,
    // OtpDialogComponent,
    AdminOtpComponent,
    SetPasswordComponent,
    TrainerslistComponent,
    AddTrainerComponent,
    UserListComponent,
    PlansComponent,
    AddPlanComponent,
    EditPlanComponent,
    SubscribersComponent,
    AdminDietPlanViewComponent,
    VideosViewComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
