// Import necessary Angular modules and services
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login', // Component selector
  standalone: true, // Indicate standalone component
  imports: [ReactiveFormsModule, CommonModule], // Required modules
  templateUrl: './login.component.html', // Template URL
  styleUrl: './login.component.scss' // Stylesheet URL
})
export class LoginComponent {
  loginForm: any; // Login form group
  registerForm: any; // Register form group
  activeForm: 'login' | 'register' = 'login'; // Currently active form

  // Constructor to inject services
  constructor(
    private fb: FormBuilder, // FormBuilder for reactive forms
    private router: Router, // Router for navigation
    private snackBar: MatSnackBar // MatSnackBar for notifications
  ) {}

  // Lifecycle hook called after component initialization
  ngOnInit() {
    // Initialize login form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email field with required and email format validators
      password: ['', Validators.required] // Password field with required validator
    });

    // Initialize register form with validators
    this.registerForm = this.fb.group({
      username: ['', Validators.required], // Username field with required validator
      email: ['', [Validators.required, Validators.email]], // Email field with required and email format validators
      password: ['', Validators.required] // Password field with required validator
    });
  }

  // Function to toggle between login and register forms
  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  // Function to handle login form submission
  login() {
    if (this.loginForm.valid) {
      console.log("Login info==>", this.loginForm.value); // Log login info if form is valid
      this.router.navigate(['/budget-planner/dashboard']); // Navigate to dashboard
    } else {
      this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 }); // Show error message if form is invalid
    }
  }

  // Function to handle register form submission
  register() {
    if (this.registerForm.valid) {
      console.log("Register info==>>", this.registerForm.value); // Log register info if form is valid
      setTimeout(() => {
        window.location.reload(); // Reload window after 2 seconds
      }, 2000);
      this.router.navigate(['/budget-planner/login']); // Navigate to login page
    } else {
      this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 }); // Show error message if form is invalid
    }
  }
}
