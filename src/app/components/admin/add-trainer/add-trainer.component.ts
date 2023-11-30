import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { trainer, userlist } from 'src/app/model/userModel';
import { AdminService } from 'src/app/services/adminServices/admin.service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent {

  registrationForm!: FormGroup
  files!: FileList

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private dialoge: MatDialog
  ) {
    this.registrationForm = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]),
      email: this.fb.control('', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      description: this.fb.control('', [Validators.required]),
      qualification: this.fb.control('', [Validators.required]),
      specification: this.fb.control('', Validators.required),
      jobPosition: this.fb.control('', Validators.required),
      location: this.fb.control('', Validators.required),
      password: this.fb.control('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]+$')]),
      reEnterPassword: this.fb.control('', Validators.required),
    });
  }

  // error fuctions
  showNameError(): any {

    const name: any = this.registrationForm.get('name');
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
  showEmailError(): any {

    const email: any = this.registrationForm.get('email');
    if (!email.valid) {
      if (email.errors.required) {
        return 'Email is required';
      }
      if (email.errors.pattern) {
        return 'Invalid Email'
      }
    }
  }

  showPasswordError(): any {

    const password: any = this.registrationForm.get('password');
    if (!password.valid) {
      if (password.errors.required) {
        return 'Password is required';
      }

      if (password.errors.minlength) {
        return 'Password should be of minimum 6 characters';
      }
      if (password.errors.pattern) {
        return 'Password should contain aleast one character and a number'
      }
    }
  }

  showReEnterPasswordError(): any {
    const repassword = this.registrationForm.get('reEnterPassword');
    const password: any = this.registrationForm.get('password')?.value;
    if (!repassword?.valid) {
      if (repassword?.hasError('required')) {
        return 'Re enter Password is required';
      }
    }
  }

  showQualificationError(): any {
    const qualification: any = this.registrationForm.get('qualification');
    if (!qualification.valid) {
      if (qualification.errors.required) {
        return 'Qualification is required';
      }
    }
  }
  showSpecificationError(): any {
    const specification: any = this.registrationForm.get('specification');
    if (!specification.valid) {
      if (specification.errors.required) {
        return 'Specification is required';
      }
    }
  }

  showDescriptionError(): any {
    const description: any = this.registrationForm.get('description');
    if (!description.valid) {
      if (description.errors.required) {
        return 'Description is required';
      }
    }
  }

  showJobPositionError(): any {
    const jobPosition: any = this.registrationForm.get('jobPosition');
    if (!jobPosition.valid) {
      if (jobPosition.errors.required) {
        return 'Job or role  is required';
      }
    }
  }
  showLocationError(): any {
    const location: any = this.registrationForm.get('location');
    if (!location.valid) {
      if (location.errors.required) {
        return 'location  is required';
      }
    }
  }


  onFileDropped(event: any) {
    event.preventDefault();
    const files: FileList = event.dataTransfer.files;
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    this.files = files;
    console.log(this.files);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }
  submitForm() {
    if (!this.registrationForm.valid) {
      if (this.showNameError()) {
        this.toastr.warning(this.showNameError())
        return
      }
      if (this.showEmailError()) {
        this.toastr.warning(this.showEmailError())
        return
      }
      if (this.showQualificationError()) {
        this.toastr.warning(this.showQualificationError())
        return
      }
      if (this.showSpecificationError()) {
        this.toastr.warning(this.showSpecificationError())
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

      if (this.showPasswordError()) {
        this.toastr.warning(this.showPasswordError())
        return
      }
      if (this.showReEnterPasswordError()) {
        this.toastr.warning(this.showReEnterPasswordError())
        return
      }
    }
    // Submit the FormData to the backend
    const repassword = this.registrationForm.get('reEnterPassword')?.value;
    const password: string = this.registrationForm.get('password')?.value
    if (repassword !== password) {
      this.toastr.warning("Password mismatch")
      return
    }
    const trainer = new FormData();
    for (const controlName of Object.keys(this.registrationForm.controls)) {
      const control = this.registrationForm.get(controlName);
      console.log("in loop", controlName, control?.value);
      trainer.append(controlName, control?.value);
    }
    const file = this.files[0];
    trainer.append('image', file, file.name);
    console.log(trainer.get('image'))
    console.log(trainer.get('email'))
    this.adminService.addTrainer(trainer).subscribe(
      (res) => {
        this.toastr.success(res.message)
        this.dialoge.closeAll()
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      },
      (error) => {
        console.log(error)
        if (error.status == 409) {
          this.toastr.error(error.error.error)
        }
        else {
          this.toastr.error(error.error.message)
        }
      }
    );
  }
}