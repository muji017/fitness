import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerModule } from './components/trainer/trainer.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';

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
  },
  {
    path:'**',component:ErrorPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
