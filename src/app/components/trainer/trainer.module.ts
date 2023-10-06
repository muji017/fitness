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

const routes:Routes=[
  {
    path:'',
    children:[
      {
        path:'',redirectTo:'login',pathMatch:'full'
      },
      {
        path:'login',component:LoginComponent
      },
      {
        path:'home',component:HomeComponent
      },
    ]
  }
]


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent
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
export class TrainerModule { }
