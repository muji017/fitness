import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DietPlanList, VideoList, trainer } from 'src/app/model/userModel';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {


  private apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<any>(`${this.apiUrl}/trainer/login`, payload);
  }
  sendOtp(email: string): Observable<any> {
    const payload = { email }
    return this.http.post<any>(`${this.apiUrl}/trainer/sendOtp`, payload)
  }
  verifyOtp(email: string, otp: string): Observable<any> {
    const payload = { email, otp }
    return this.http.post<any>(`${this.apiUrl}/trainer/verifyOtp`, payload)
  }
  resendOtp(email: string): Observable<any> {
    const payload = { email }
    return this.http.put<any>(`${this.apiUrl}/trainer/resendOtp`, payload)
  }
  setPassword(email: string, password: string): Observable<any> {
    const payload = { email, password }
    return this.http.put<any>(`${this.apiUrl}/trainer/setPassword`, payload)
  }

  addDietPlan(form: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trainer/addDietPlan`, form)
  }

  updateDietPlan(form: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/trainer/updateDietPlan`, form)
  }
  getDietPlans(): Observable<DietPlanList> {
    return this.http.get<DietPlanList>(`${this.apiUrl}/trainer/getDietPlans?`)
  }

  deleteDietPlan(planId: any): Observable<DietPlanList> {
    const params = new HttpParams().set('planId', planId);
    return this.http.delete<DietPlanList>(`${this.apiUrl}/trainer/deleteDietPlan`, { params: params });

  }

  getTrainerProfile():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/trainer/getTrainerProfile?`)
  }

  uploadPic(form:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/trainer/uploadPic`,form)
   }

   updateProfile(profile:FormData):Observable<DietPlanList>{
    return this.http.put<DietPlanList>(`${this.apiUrl}/trainer/updateProfile`,profile)
  }

   changePassword(password:string):Observable<any>{
    const payload={password}
    return this.http.put<any>(`${this.apiUrl}/changePassword`,payload)
   }


   getAllVideos():Observable< VideoList>{
    return this.http.get< VideoList>(`${this.apiUrl}/trainer/getAllVideos?`)
  }


  addVideo(form: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trainer/addVideo`, form)
  }

  deleteVideo(videoId:any):Observable<VideoList>{
    const params = new HttpParams().set('videoId', videoId);
    return this.http.delete<any>(`${this.apiUrl}/trainer/deleteVideo`, { params: params });
  }
  updateVideo(form: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/trainer/updateVideo`, form)
  }
}

