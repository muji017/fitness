import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/userServices/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm!: FormGroup
  errorMsg: string = ""
  pattern = "[a-zA-Z][a-zA-Z ]+"
  constructor(private service: UserService, private toastr: ToastrService
    , private router: Router, private formBuilder: FormBuilder) {

  }


  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2), Validators.pattern(this.pattern)]),
      email: this.formBuilder.control('', [Validators.required, 
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      repassword: new FormControl('', Validators.required,)
    }, {

    })
  }


  showNameError(): any {

    const name: any = this.signUpForm.get('name');
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

    const email: any = this.signUpForm.get('email');
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

    const password: any = this.signUpForm.get('password');
    if (!password.valid) {
      if (password.errors.required) {
        return 'Password is required';
      }

      if (password.errors.minlength) {
        return 'Password should be of minimum 6 characters';
      }
      if (password.errors.pattern) {
        return 'Your password is too common'
      }
    }
  }

  showReEnterPasswordError(): any {
    const repassword = this.signUpForm.get('repassword');
    const password: any = this.signUpForm.get('password')?.value;
    if (!repassword?.valid) {
      if (repassword?.hasError('required')) {
        return 'Password is required';
      }
    }
  }

  signUp() {
    if (!this.signUpForm.valid) {
      if (this.showNameError()) {
        this.toastr.warning(this.showNameError())
        return
      }
      if (this.showEmailError()) {
        this.toastr.warning(this.showEmailError())
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
      return
    }

    const repassword = this.signUpForm.get('repassword')?.value;
    const name: string = this.signUpForm.get('name')?.value
    const email: string = this.signUpForm.get('email')?.value
    const password: string = this.signUpForm.get('password')?.value
    if (repassword !== password) {
      this.toastr.warning("Password mismatch")
      return
    }

    this.service.signup(name, email, password).subscribe(
      (response) => {
        this.toastr.success(`"You have successfully registered. Please proceed to log in with your email and password."`);
        this.router.navigate(['/login']);

      },
      (error) => {
        this.errorMsg = error.error.error

        this.toastr.error(error.error.error);

      }
    );

  }
}
