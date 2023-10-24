
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { trainer } from 'src/app/model/userModel';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';
import { getTrainerProfileApi } from 'src/app/store/action';
import { getTrainer } from 'src/app/store/selector';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerProfileComponent {

  trainer!: trainer | undefined
  trainerId: any
  files!:FileList
  passForm!:FormGroup
  editForm!:FormGroup
  constructor(private trainerService:TrainerService,
    private toastr:ToastrService, private fb:FormBuilder
  ) {
    
    this.editForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      description: this.fb.control('', [Validators.required]),
      qualification: this.fb.control('', [Validators.required]),
      jobPosition: this.fb.control('', Validators.required),
      location: this.fb.control('', Validators.required),
    });
    
    this.passForm=this.fb.group({
      password: this.fb.control('', [Validators.required, Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
        reEnterPassword: this.fb.control('', Validators.required,)
     })
  }
  ngOnInit() {  

  
    this.trainerService.getTrainerProfile().subscribe((res) => {
      this.trainer = res.trainer;
      this.trainerId = this.trainer?._id;
  
      // Set initial values for the form controls based on this.trainer data
      this.editForm.patchValue({
        name: this.trainer?.name,
        description: this.trainer?.description,
        qualification: this.trainer?.qualification,
        jobPosition: this.trainer?.jobPosition,
        location: this.trainer?.location,
      });
    });
  
  }

  onFileSelected(event:any){
    const files: FileList = event.target.files;
    this.files = files;
    console.log(this.files);
    const form=new FormData()
    const file = this.files[0];
    form.append('image', file, file.name);
    this.trainerService.uploadPic(form).subscribe(
      (res)=>{
        this.toastr.success("Image Uploaded successfully")
        this.ngOnInit()
      }
    )
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
      this.trainerService.changePassword(password).subscribe(
        (res)=>{
          this.toastr.success("Password Updated successfully")
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }
      )
    }



      // error fuctions
  showNameError(): any {

    const name: any = this.editForm.get('name');
    if (!name.valid) {
      if (name.errors.required) {
        return "Name is required"
      }


      if (name.errors.minlength) {
        return 'Name should be of minimum 2 characters';
      }
      if (name.errors.pattern) {
        return 'Name should only contain alphabetic characters';
      }

    }
  }
  showQualificationError(): any {
    const qualification: any = this.editForm.get('qualification');
    if (!qualification.valid) {
      if (qualification.errors.required) {
        return 'Qualification is required';
      }
    }
  }

  showDescriptionError(): any {
    const description: any = this.editForm.get('description');
    if (!description.valid) {
      if (description.errors.required) {
        return 'Description is required';
      }
    }
  }

  showJobPositionError(): any {
    const jobPosition: any = this.editForm.get('jobPosition');
    if (!jobPosition.valid) {
      if (jobPosition.errors.required) {
        return 'Job or role  is required';
      }
    }
  }
  showLocationError(): any {
    const location: any = this.editForm.get('location');
    if (!location.valid) {
      if (location.errors.required) {
        return 'location  is required';
      }
    }
  }

    submitForm() {
      if (!this.editForm.valid) {
        if (this.showNameError()) {
          this.toastr.warning(this.showNameError())
          return
        }
        if (this.showQualificationError()) {
          this.toastr.warning(this.showQualificationError())
          return
        }
        if (this.showDescriptionError()) {
          this.toastr.warning(this.showDescriptionError())
          return
        }
        if (this.showJobPositionError()) {
          this.toastr.warning(this.showJobPositionError())
          return
        }
        if (this.showLocationError()) {
          this.toastr.warning(this.showLocationError())
          return
        }
      }
      const profile = new FormData();
  
      for (const controlName of Object.keys(this.editForm.controls)) {
        const control = this.editForm.get(controlName);
        console.log("in loop", controlName, control?.value);
        profile.append(controlName, control?.value);
      }

      profile.append('trainerId',this.trainerId)
      this.trainerService.updateProfile(profile).subscribe(
        (res) => {
          this.toastr.success("Plan Updated successfully")
          setTimeout(() => {
            window.location.reload();
          }, 3000)
        },
        (error) => {
          
            this.toastr.error(error.error.message)
          }
        
      )
    }
}
