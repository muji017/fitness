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
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

import { UserEffects } from './store/effects';
import { allDietPlansStateName, allPlansStateName, allUsersStateName, alltrainersStateName, authStateName, trainerStateName, videosStateName } from './store/selector';
import { AuthReducer, allDietPlansReducer, allPlansReducer, allTrainersReducer, allUsersReducer, allVideosReducer, trainerReducer } from './store/reducer';
import { UserTrainerProfileComponent } from './components/user/user-trainer-profile/user-trainer-profile.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ViewDietPlanComponent } from './components/user/view-diet-plan/view-diet-plan.component';
import { ViewDietPlanDetailsComponent } from './components/user/view-diet-plan-details/view-diet-plan-details.component';
import { VideosComponent } from './components/user/videos/videos.component';
import { VideoPlayerComponent } from './components/user/video-player/video-player.component';


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
    ErrorPageComponent,
    ProfileComponent,
    ViewDietPlanComponent,
    ViewDietPlanDetailsComponent,
    VideosComponent,
    VideoPlayerComponent,
  ],
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
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
    StoreModule.forFeature(trainerStateName,trainerReducer),
    StoreModule.forFeature(authStateName,AuthReducer),
    StoreModule.forFeature(alltrainersStateName,allTrainersReducer),
    StoreModule.forFeature(allUsersStateName,allUsersReducer),
    StoreModule.forFeature(allPlansStateName,allPlansReducer),
    StoreModule.forFeature(allDietPlansStateName,allDietPlansReducer),
    StoreModule.forFeature(videosStateName,allVideosReducer),
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
