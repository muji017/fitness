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
    const trainer: any = localStorage.getItem('trainerToken')
    const trainerparse = JSON.parse(trainer)
    const trainerId = trainerparse?.trainerId
    form.append('trainerId', trainerId)
    return this.http.post<any>(`${this.apiUrl}/trainer/addDietPlan`, form)
  }

  updateDietPlan(form: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/trainer/updateDietPlan`, form)
  }
  getDietPlans(): Observable<DietPlanList> {
    const trainer: any = localStorage.getItem('trainerToken')
    const trainerparse = JSON.parse(trainer)
    const trainerId = trainerparse?.trainerId
    const params = new HttpParams().set('trainerId', trainerId);
    return this.http.get<DietPlanList>(`${this.apiUrl}/trainer/getDietPlans?`, { params: params })
  }

  deleteDietPlan(planId: any): Observable<any> {
    const params = new HttpParams().set('planId', planId);
    return this.http.delete<any>(`${this.apiUrl}/trainer/deleteDietPlan`, { params: params });

  }

  getTrainerProfile():Observable<any>{
    const trainer: any = localStorage.getItem('trainerToken')
    const trainerparse = JSON.parse(trainer)
    const trainerId = trainerparse?.trainerId
    const params = new HttpParams().set('trainerId', trainerId);
    return this.http.get<any>(`${this.apiUrl}/trainer/getTrainerProfile?`, { params: params })
  }

  uploadPic(form:FormData):Observable<any>{
    const trainer: any = localStorage.getItem('trainerToken')
    const trainerparse = JSON.parse(trainer)
    const trainerId = trainerparse?.trainerId
    form.append('trainerId', trainerId)
    return this.http.put<any>(`${this.apiUrl}/trainer/uploadPic`,form)
   }

   updateProfile(profile:FormData):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/trainer/updateProfile`,profile)
  }

   changePassword(password:string):Observable<any>{
    const trainer: any = localStorage.getItem('trainerToken')
    const trainerparse = JSON.parse(trainer)
    const trainerId = trainerparse?.trainerId
    const payload={password,trainerId}
    return this.http.put<any>(`${this.apiUrl}/changePassword`,payload)
   }


   getAllVideos():Observable< VideoList>{
    const trainer: any = localStorage.getItem('trainerToken')
    const trainerparse = JSON.parse(trainer)
    const trainerId = trainerparse?.trainerId
    const params = new HttpParams().set('trainerId', trainerId);
    return this.http.get< VideoList>(`${this.apiUrl}/trainer/getAllVideos?`, { params: params })
  }


  addVideo(form: FormData): Observable<any> {
    const trainer: any = localStorage.getItem('trainerToken')
    const trainerparse = JSON.parse(trainer)
    const trainerId = trainerparse?.trainerId
    form.append('trainerId', trainerId)
    return this.http.post<any>(`${this.apiUrl}/trainer/addVideo`, form)
  }

}

