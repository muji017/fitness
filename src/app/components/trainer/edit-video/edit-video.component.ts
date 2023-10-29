import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { VideoModel } from 'src/app/model/userModel';
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
    private fb:FormBuilder
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

  }
}
