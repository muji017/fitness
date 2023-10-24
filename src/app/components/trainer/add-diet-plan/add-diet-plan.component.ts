import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TrainerService } from 'src/app/services/trainerServices/trainer.service';

@Component({
  selector: 'app-add-diet-plan',
  templateUrl: './add-diet-plan.component.html',
  styleUrls: ['./add-diet-plan.component.css']
})
export class AddDietPlanComponent {
  addPlanForm!: FormGroup
  files!: FileList
  imageSrc: string[]=[]

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private trainerService: TrainerService,
    private dialoge: MatDialog
  ) {
    this.addPlanForm = this.fb.group({
      title: fb.control('', [Validators.required, Validators.minLength(3)]),
      foodType: fb.control('', [Validators.required]),
      description: fb.control('', [Validators.required, Validators.minLength(15)])
    });
  }

  // error fuctions
  showTitleError(): any {

    const title: any = this.addPlanForm.get('title');
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

    const foodType: any = this.addPlanForm.get('foodType');
    if (!foodType.valid) {
      if (foodType.errors.required) {
        return "FoodType is required"
      }
    }
  }

  showDescriptionError(): any {

    const description: any = this.addPlanForm.get('description');
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
    if (!this.addPlanForm.valid) {
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
      return
    }
    const plan = new FormData();

    for (const controlName of Object.keys(this.addPlanForm.controls)) {
      const control = this.addPlanForm.get(controlName);
      console.log("in loop", controlName, control?.value);
      plan.append(controlName, control?.value);
    }
    const file = this.files[0];
    plan.append('image', file, file.name);
    this.trainerService.addDietPlan(plan).subscribe(
      (res) => {
        this.toastr.success("Dietplan added successfully")
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
