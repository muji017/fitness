import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel, userToken } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';
import { WatchhistoryComponent } from '../watchhistory/watchhistory.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  
  user!:UserModel
  files!: FileList
  name!:string
  passForm!:FormGroup
  apiUrl!:string

  constructor(
    private userService:UserService,private  dialog:MatDialog,
    private router:Router, private fb:FormBuilder, private toastr:ToastrService
  ){
    this.apiUrl = userService.getapiUrl()
     this.passForm=this.fb.group({
      password: this.fb.control('', [Validators.required, Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
        reEnterPassword: this.fb.control('', Validators.required,)
     })
  }

  ngOnInit(){
   
    this.userService.getProfile().subscribe(
      (res:any)=>{
        this.user=res.user
        this.name=this.user.name
    })
     
  }

  onFileSelected(event:any):any{
    const files: FileList = event.target.files;
    this.files = files;
    const form=new FormData()
    const file = this.files[0];
    if (!file.type.startsWith('image/')) {
      return this.toastr.warning('Image type is invalid');
  }
    form.append('image', file, file.name);
    this.userService.uploadPic(form).subscribe(
      (res)=>{
        this.toastr.success("Image Uploaded successfully")
        this.ngOnInit()
      }
    )
  }
  
  openWatchHistory(){
    const data={
      userId:this.user._id
    }
    this.dialog.open(WatchhistoryComponent,{
      enterAnimationDuration:1000,
      exitAnimationDuration:1000,
      maxHeight: '500px',
      data:data
    })
  }
  changeName(){
   const name=this.name
   this.userService.changeName(name).subscribe(
    (res)=>{
      this.toastr.success("Name Updated successfully")
      this.ngOnInit()
    }
   )
  }

  subscribe(){
    this.router.navigate(['/subscription'])
  }

  showPasswordError(): any {

    const password: any = this.passForm.get('password');
    if (!password.valid) {
      if (password.errors.required) {
        return 'Password is required';
      }
  
      if (password.errors.minlength) {
        return 'Password should be of minimum 6 characters';
      }
      if(password.errors.pattern){
        return 'Your password is too common'
      }
    }
  }
  
  showReEnterPasswordError(): any {
    const repassword = this.passForm.get('reEnterPassword');
    const password: any = this.passForm.get('password')?.value;
    if (!repassword?.valid) {
      if (repassword?.hasError('required')) {
        return 'Re enter Password is required';
      }
    }
  }
  
  
  changePassword(){
  
      if(!this.passForm.valid){
        if (this.showPasswordError()) {
          this.toastr.warning(this.showPasswordError())
          return
        }
        if (this.showReEnterPasswordError()) {
          this.toastr.warning(this.showReEnterPasswordError())
          return
        }
        return
      }
      const repassword:string = this.passForm.get('reEnterPassword')?.value;
      const password: string = this.passForm.get('password')?.value
      if(repassword!==password){
        this.toastr.warning("Password mismatch")
        return
      }
      this.userService.changePassword(password).subscribe(
        (res)=>{
          this.toastr.success("Password Updated successfully")
          this.ngOnInit()
        }
      )
    }
}
