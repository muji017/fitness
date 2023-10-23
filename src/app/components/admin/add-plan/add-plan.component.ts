import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent {

  addPlanForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService,
    private dialoge:MatDialog
  ) {
    this.addPlanForm = this.fb.group({
      title: fb.control('', [Validators.required, Validators.minLength(3)]),
      amount: fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      duration: fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]),
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

  showDurationError(): any {

    const duration: any = this.addPlanForm.get('duration');
    if (!duration.valid) {
      if (duration.errors.required) {
        return "Duration is required"
      }
      if (duration.errors.pattern) {
        return 'Duration should be number of months';
      }

    }
  }

  showAmountError(): any {

    const amount: any = this.addPlanForm.get('amount');
    if (!amount.valid) {
      if (amount.errors.required) {
        return "Amount is required"
      }
      if (amount.errors.pattern) {
        return 'Amount should be number';
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


  submitForm() {
    if (!this.addPlanForm.valid) {
      if (this.showTitleError()) {
        this.toastr.warning(this.showTitleError())
        return
      }
      if (this.showDurationError()) {
        this.toastr.warning(this.showDurationError())
        return
      }
      if (this.showAmountError()) {
        this.toastr.warning(this.showAmountError())
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
    this.adminService.addPlan(plan).subscribe(
      (res) => {
        this.toastr.success("Plan added successfully")
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
