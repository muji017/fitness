import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerModule } from './components/trainer/trainer.module';

const routes: Routes = [
  { 
    path:"",
   loadChildren:()=>import('./components/user/user.module').then((m)=>m.UserModule)
  },
  {
    path:'admin',
    loadChildren:()=>import('./components/admin/admin.module').then((m)=>m.AdminModule)
  }
  ,
  {
    path:'trainer',
    loadChildren:()=>import('./components/trainer/trainer.module').then((m)=>TrainerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
