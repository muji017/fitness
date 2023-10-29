import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { DietPlansModel } from 'src/app/model/userModel';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';
import { getAllDietPlans } from 'src/app/store/selector';

@Component({
  selector: 'app-edit-diet-plan',
  templateUrl: './edit-diet-plan.component.html',
  styleUrls: ['./edit-diet-plan.component.css']
})
export class EditDietPlanComponent {

  editPlanForm!: FormGroup
  files!: FileList
  dietPlans!: DietPlansModel[]
  planId!: any
  imageSrc!:any

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private trainerService: TrainerService,
    private dialoge: MatDialog,
    private store: Store<DietPlansModel[]>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.planId = this.data.planId

    this.store.select(getAllDietPlans).subscribe((res) => {
      const data = res
      this.dietPlans = data.filter((dp)=>dp._id==this.planId)

    })
    this.imageSrc='http://localhost:3000/public/images/'+this.dietPlans[0].image
    this.editPlanForm = this.fb.group({
      title: fb.control(this.dietPlans[0].title, [Validators.required, Validators.minLength(3)]),
      foodType: fb.control(this.dietPlans[0].foodType, [Validators.required]),
      description: fb.control(this.dietPlans[0].description, [Validators.required, Validators.minLength(15)]),

    });
  }

  // error fuctions
  showTitleError(): any {

    const title: any = this.editPlanForm.get('title');
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

  showFoodTypeError(): any {

    const foodType: any = this.editPlanForm.get('foodType');
    if (!foodType.valid) {
      if (foodType.errors.required) {
        return "FoodType is required"
      }
    }
  }

  showDescriptionError(): any {

    const description: any = this.editPlanForm.get('description');
    if (!description.valid) {
      if (description.errors.required) {
        return "Description is required"
      }
      if (description.errors.minlength) {
        return 'Description Should be minimum 15 characters';
      }

    }
  }

  onFilesSelected(event: any):any {
    const files: FileList = event.target.files;
    this.files = files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        console.log('File type is:', file.type);
        return this.toastr.warning('Image type is invalid');
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

  submitForm() {
    console.log("submit press");
    
    if (!this.editPlanForm.valid) {
      if (this.showTitleError()) {
        this.toastr.warning(this.showTitleError())
        return
      }
      if (this.showFoodTypeError()) {
        this.toastr.warning(this.showFoodTypeError())
        return
      }
      if (this.showDescriptionError()) {
        this.toastr.warning(this.showDescriptionError())
        return
      }
    }
    const plan = new FormData();

    for (const controlName of Object.keys(this.editPlanForm.controls)) {
      const control = this.editPlanForm.get(controlName);
      console.log("in loop", controlName, control?.value);
      plan.append(controlName, control?.value);
    }
    if(this.files){
    const file = this.files[0];
    if(file){
    plan.append('image', file, file.name);
    }
  }
    plan.append('videoId',this.planId)
    this.trainerService.updateVideo(plan).subscribe(
      (res) => {
        this.toastr.success("Dietplan Updated successfully")
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
