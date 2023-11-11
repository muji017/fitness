import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent {
   
  uploadVideoForm!:FormGroup
  files!:FileList

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private trainerService: TrainerService,
    private dialoge:MatDialog
  ){ 
    this.uploadVideoForm = this.fb.group({
      title: fb.control('', [Validators.required, Validators.minLength(3)]),
      workoutType: fb.control('', [Validators.required]),
      bodyPart: fb.control('', [Validators.required]),
      description: fb.control('', [Validators.required, Validators.minLength(15)])
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
    // for (let i = 0; i < files.length; i++) {
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     console.log(e.target.result);
    //     this.imageSrc.push(e.target.result);
    //   };

    //   reader.readAsDataURL(this.files[i]);
    // }
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
    const file = this.files[0];
    plan.append('video', file, file.name);
    this.trainerService.addVideo(plan).subscribe(
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
