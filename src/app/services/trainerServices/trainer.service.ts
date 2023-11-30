import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DietPlanList, VideoList, trainer } from 'src/app/model/userModel';
import { url } from '../endPoint';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {


  private apiUrl: string = url;

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<{ trainerId:string, trainerToken: string}> {
    const payload = { email, password };
    return this.http.post<{ trainerId:string, trainerToken: string}>(`${this.apiUrl}/trainer/login`, payload);
  }
  sendOtp(email: string): Observable<string> {
    const payload = { email }
    return this.http.post<string>(`${this.apiUrl}/trainer/sendOtp`, payload)
  }
  verifyOtp(email: string, otp: string): Observable<{ email: string }> {
    const payload = { email, otp }
    return this.http.post<{ email: string }>(`${this.apiUrl}/trainer/verifyOtp`, payload)
  }
  resendOtp(email: string): Observable<string> {
    const payload = { email }
    return this.http.put<string>(`${this.apiUrl}/trainer/resendOtp`, payload)
  }
  setPassword(email: string, password: string): Observable<{ trainerId:string, trainerToken:string }> {
    const payload = { email, password }
    return this.http.put<{ trainerId:string, trainerToken:string }>(`${this.apiUrl}/trainer/setPassword`, payload)
  }

  addDietPlan(form: FormData): Observable<{ message:string }> {
    return this.http.post<{ message:string }>(`${this.apiUrl}/trainer/addDietPlan`, form)
  }

  updateDietPlan(form: FormData): Observable<{ message:string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/trainer/updateDietPlan`, form)
  }
  getDietPlans(): Observable<DietPlanList> {
    return this.http.get<DietPlanList>(`${this.apiUrl}/trainer/getDietPlans?`)
  }

  deleteDietPlan(planId: any): Observable<DietPlanList> {
    const params = new HttpParams().set('planId', planId);
    return this.http.delete<DietPlanList>(`${this.apiUrl}/trainer/deleteDietPlan`, { params: params });

  }

  getTrainerProfile():Observable<{ trainer:trainer }>{
    return this.http.get<{ trainer:trainer }>(`${this.apiUrl}/trainer/getTrainerProfile?`)
  }

  uploadPic(form:FormData):Observable<{ message:string}>{
    return this.http.patch<{message:string}>(`${this.apiUrl}/trainer/uploadPic`,form)
   }

   updateProfile(profile:FormData):Observable<DietPlanList>{
    return this.http.patch<DietPlanList>(`${this.apiUrl}/trainer/updateProfile`,profile)
  }

   changePassword(password:string):Observable<{message:string}>{
    const payload={password}
    return this.http.patch<{message:string}>(`${this.apiUrl}/trainer/changePassword`,payload)
   }


   getAllVideos():Observable< VideoList>{
    return this.http.get< VideoList>(`${this.apiUrl}/trainer/getAllVideos?`)
  }


  addVideo(form: FormData): Observable<{message:string}> {
    return this.http.post<{message:string}>(`${this.apiUrl}/trainer/addVideo`, form)
  }

  deleteVideo(videoId:any):Observable<VideoList>{
    const params = new HttpParams().set('videoId', videoId);
    return this.http.delete<any>(`${this.apiUrl}/trainer/deleteVideo`, { params: params });
  }
  updateVideo(form: FormData): Observable<{ message: string}> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/trainer/updateVideo`, form)
  }
}

