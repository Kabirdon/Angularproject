
// Import necessary Angular modules and components
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SideNavComponent } from '../../side-nav/side-nav.component';

@Component({
    // Component selector
    selector: 'app-history',
    // Custom property indicating standalone nature of the component
    standalone: true,
    // HTML template and CSS styles for the component
    templateUrl: './history.component.html',
    styleUrl: './history.component.scss',
    imports: [ReactiveFormsModule, CommonModule, MatIconModule, SideNavComponent, SideNavComponent]
})
export class HistoryComponent {
  // Declare class properties
  todoForm: any; // Form control
  selectedMonth: string; // Currently selected month
  expenses: { month: string, expenseAmount: number }[] = [ // List of expenses for different months
    { month: 'January', expenseAmount: 1500 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 1800 }
  ];
  monthSelected: boolean = false; // Flag indicating if a month is selected
  januaryExpense: any[] = [ // List of expenses for January
    { expenseType: 'Recharge', expenseAmount: 1000 },
    { expenseType: 'Light Bills', expenseAmount: 500 },
  ];
  februaryExpense: any[] = [ // List of expenses for February
    { expenseType: 'Essentials', expenseAmount: 200 },
    { expenseType: 'Light Bills', expenseAmount: 400 }
  ];
  marchExpense: any[] = [ // List of expenses for March
    { expenseType: 'Recharge', expenseAmount: 1100 },
    { expenseType: 'Essentials', expenseAmount: 250 }
  ];

  // Constructor to initialize selectedMonth
  constructor(private fb: FormBuilder, private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Initialize todoForm using FormBuilder
    this.todoForm = this.fb.group({
      month: ['', Validators.required], // Form control for month selection
      expenseType: ['', Validators.required], // Form control for expense type
      expenseAmount: ['', Validators.required] // Form control for expense amount
    });
  }

  // Function to handle submission of expense form
  onSubmitExpense() {
    // Check if form is valid
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value; // Get form values
      this.getFilteredExpenses().push(newExpense); // Add new expense to filtered expenses
      this.todoForm.reset(); // Reset form after submission
    }
  }

  // Function to handle change in selected month
  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value; // Update selected month
    this.monthSelected = true; // Set flag to indicate month is selected
    this.getFilteredExpenses(); // Update filtered expenses based on selected month
  }

  // Function to get expenses based on selected month
  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense; // Return January expenses
      case 'February':
        return this.februaryExpense; // Return February expenses
      case 'March':
        return this.marchExpense; // Return March expenses
      default:
        return []; // Return empty array if month is not found
    }
  }

  // Function to calculate total expense for a given month
  calculateTotalExpense(month: string): number {
    // Reduce filtered expenses to calculate total expense
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  // Function to handle saving expense form
  onSave() {
    // Check if form is valid
    if (this.todoForm.valid) {
      // Reset form with selected month and update filtered expenses
      this.todoForm.reset({ month: this.selectedMonth });
      this.getFilteredExpenses();
    }
  }

  // Function to handle saving the form
  saveForm() {
    console.log("Form saved!"); // Log message indicating form is saved
  }

  // Function to navigate back to dashboard
  onBack() {
    this.router.navigate(['/budget-planner/dashboard']); // Navigate to dashboard route
  }
}
