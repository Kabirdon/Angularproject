// Import necessary Angular modules and components
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideNavComponent } from '../../side-nav/side-nav.component';


@Component({
  // Component selector
  selector: 'app-profile',
  // Custom property indicating standalone nature of the component
  standalone: true,
  // Import required modules for the component
  imports: [ReactiveFormsModule, CommonModule, SideNavComponent],
  // HTML template and CSS styles for the component
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: any; // Form control

  // Constructor to inject FormBuilder and MatSnackBar services
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Initialize profileForm using FormBuilder with validators
    this.profileForm = this.fb.group({
      name: ['', Validators.required], // Name field with required validator
      age: ['', [Validators.required, Validators.min(18)]], // Age field with required and minimum age validators
      dob: ['', Validators.required], // Date of birth field with required validator
      gender: ['', Validators.required], // Gender field with required validator
      occupation: ['', Validators.required], // Occupation field with required validator
      email: ['', [Validators.required, Validators.email]], // Email field with required and email format validators
      address: ['', Validators.required], // Address field with required validator
      contact: ['', Validators.required] // Contact field with required validator
    });
  }

  // Function to handle form submission
  onSubmit() {
    // Check if form is valid
    if (this.profileForm.valid) {
      console.log("Form Save!!!", this.profileForm.value); // Log form values if valid
    } else {
      this.openSnackBar('Please fill in all fields correctly!', 'Close'); // Show error message if form is invalid
    }
  }

  // Function to display a snack bar with a message and action
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000 // Duration for which the snack bar is displayed
    });
  }
}
