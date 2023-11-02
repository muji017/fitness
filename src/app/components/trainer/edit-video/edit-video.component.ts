import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { VideoModel } from 'src/app/model/userModel';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';
import { getAllVideosApiSuccess } from 'src/app/store/action';
import { getAllVideos } from 'src/app/store/selector';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent {

  uploadVideoForm!:FormGroup
  files!:FileList
  imageSrc!:any
  videos!:VideoModel[]
  video!:VideoModel
  videoId!:any

  constructor(
    private toastr:ToastrService,
    private store:Store<VideoModel[]>,
    @Inject (MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder,
    private trainerService:TrainerService,
    private dialoge:MatDialog
  )
  {
    this.videoId = this.data.videoId
    this.store.select(getAllVideos).subscribe(
      (res)=>{
        const data=res
        this.videos=data.filter((dp)=>dp._id==this.videoId)
        console.log(this.videos);
        
      }
    )
    this.imageSrc='http://localhost:3000/public/images/'+this.videos[0].video
    this.uploadVideoForm = this.fb.group({
      title: fb.control(this.videos[0].title, [Validators.required, Validators.minLength(3)]),
      workoutType: fb.control(this.videos[0].workoutType, [Validators.required]),
      bodyPart: fb.control(this.videos[0].bodyPart, [Validators.required]),
      description: fb.control(this.videos[0].description, [Validators.required, Validators.minLength(15)])
    });
  }

    // error fuctions
    showTitleError(): any {

      const title: any = this.uploadVideoForm.get('title');
      if (!title.valid) {
        if (title.errors.required) {
          return "Title is required"
        }
        if (title.errors.minlength) {
          return 'Title should be of minimum 3 characters';
        }
        if (title.errors.pattern) {
          return 'Name should only contain alphabetic characters';
        }
  
      }
    }
  
    showWorkoutTypeError(): any {
  
      const workouType: any = this.uploadVideoForm.get('workoutType');
      if (!workouType.valid) {
        if (workouType.errors.required) {
          return "WorkoutType is required"
        }
      }
    }

    showBodyPartError(): any {
  
      const bodyPart: any = this.uploadVideoForm.get('bodyPart');
      if (!bodyPart.valid) {
        if (bodyPart.errors.required) {
          return "Bodypart is required"
        }
      }
    }
  
    showDescriptionError(): any {
  
      const description: any = this.uploadVideoForm.get('description');
      if (!description.valid) {
        if (description.errors.required) {
          return "Description is required"
        }
        if (description.errors.minlength) {
          return 'Description Should be minimum 15 characters';
        }
  
      }
    }
    



  onFilesSelected(event: any): any {
    const files: FileList = event.target.files;
    this.files = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('video/')) {
        console.log('File type is:', file.type);
        return this.toastr.warning('Video type is invalid');
      }
    }
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.imageSrc.push(e.target.result);
      };

      reader.readAsDataURL(this.files[i]);
    }
    console.log(this.files);
  }

  submitForm(){
    if (!this.uploadVideoForm.valid) {
      if (this.showTitleError()) {
        this.toastr.warning(this.showTitleError())
        return
      }
      if (this.showWorkoutTypeError()) {
        this.toastr.warning(this.showWorkoutTypeError())
        return
      }
      if (this.showBodyPartError()) {
        this.toastr.warning(this.showBodyPartError())
        return
      }
      if (this.showDescriptionError()) {
        this.toastr.warning(this.showDescriptionError())
        return
      }
      return
    }
    const plan = new FormData();

    for (const controlName of Object.keys(this.uploadVideoForm.controls)) {
      const control = this.uploadVideoForm.get(controlName);
      console.log("in loop", controlName, control?.value);
       plan.append(controlName, control?.value);
    }
    if(this.files){
    const file = this.files[0];
    plan.append('video', file, file.name);
    }
    plan.append('videoId',this.videoId)
    this.trainerService.updateVideo(plan).subscribe(
      (res) => {
        this.toastr.success("Video added successfully")
        this.dialoge.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      },
      (error) => {
        if (error.status == 409) {
          this.toastr.error(error.error.message)
        }
        else {
          this.toastr.error(error.error.message)
        }
      }
    )
  }
}
