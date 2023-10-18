import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/user/header/header.component';
import { FooterComponent } from './components/user/footer/footer.component';
import { HomeComponent } from './components/user/home/home.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { OtpDialogComponent } from './components/user/otp-dialog/otp-dialog.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { InterceptorService } from './services/interceptor.service';
import { UsertrainerslistComponent } from './components/user/usertrainerslist/usertrainerslist.component';
import { BmicalculatorComponent } from './components/user/bmicalculator/bmicalculator.component';
import { SubscriptionComponent } from './components/user/subscription/subscription.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserEffects } from './store/effects';
import { alltrainersStateName, authStateName } from './store/selector';
import { AuthReducer, allTrainersReducer } from './store/reducer';
import { UserTrainerProfileComponent } from './components/user/user-trainer-profile/user-trainer-profile.component';
import { ProfileComponent } from './components/user/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    OtpDialogComponent,
    ResetPasswordComponent,
    UsertrainerslistComponent,
    BmicalculatorComponent,
    SubscriptionComponent,
    UserTrainerProfileComponent,
    
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    ToastrModule.forRoot(),
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(authStateName,AuthReducer),
    StoreModule.forFeature(alltrainersStateName,allTrainersReducer)
  ],
  providers: [

    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      progressBar: true
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
