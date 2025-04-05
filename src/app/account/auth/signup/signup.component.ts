import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';


import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule]
})
export class SignupComponent implements OnInit {

  signupForm: UntypedFormGroup;
  submitted: any = false;
  error: any = 'fdsfsdfdsf';
  successmsg: any = false;
  selectedFile: File;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder,  private router: Router,private userService:UserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      personalInformation: ['', Validators.required],
      function: ['', Validators.required],
      age: ['', Validators.pattern('^[0-9]*$')], // If age is a number
      company: [''],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        country: [''],
        postalCode: ['']
      }),
      role: ['CANDIDATE']  // Default role can be 'CANDIDATE', can be modified based on use case
    });
  }

  

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];  // Save the selected file
  }
  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;  // Mark the form as submitted
  
    // Stop if the form is invalid
    
  
    console.log('Form Data:', this.signupForm.value);
    
    // Assuming the createUser method is correct in your userService
    this.userService.createUser(this.signupForm.value).subscribe({
      next: (success) => {
        console.log('User created successfully:', success);
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
        console.error('Error during user creation:', err);
        this.error = 'There was an error creating your account. Please try again.';
        this.successmsg = false;  // Hide success message if there’s an error
      }
    });
  }
}
