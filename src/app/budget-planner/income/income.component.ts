
// Import necessary Angular modules and components
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Define the IncomeComponent with its metadata
@Component({
  selector: 'app-income', // Component selector
  standalone: true, // Indicates this component can be used standalone
  imports: [ReactiveFormsModule, CommonModule], // Modules to import
  templateUrl: './income.component.html', // HTML template for the component
  styleUrl: './income.component.scss' // SCSS file for the component's styles
})
export class IncomeComponent {
  // Define properties for the component
  incomeForm: any; // Form object for handling income entries
  selectedMonth: any; // Selected month from the dropdown
  monthSelected: boolean = false; // Flag to check if a month is selected

  // Predefined income data for January, February, and March
  januaryIncomes: any[] = [
    { source: 'Salary', amount: 5000, investments: '401(k)' },
    { source: 'Freelancing', amount: 1000, investments: 'Stocks' },
  ];
  februaryIncomes: any[] = [
    { source: 'Salary', amount: 5500, investments: '401(k)' },
    { source: 'Rental Income', amount: 700, investments: 'Real Estate' },
  ];
  marchIncomes: any[] = [
    { source: 'Salary', amount: 5200, investments: '401(k)' },
    { source: 'Freelancing', amount: 1200, investments: 'Stocks' },
    { source: 'Rental Income', amount: 600, investments: 'Real Estate' },
  ];

  // Constructor to inject FormBuilder and Router services
  constructor(public fb: FormBuilder, public router: Router) {
    const currentDate = new Date(); // Get current date
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' }); // Set selectedMonth to the current month
  }

  // OnInit lifecycle hook to initialize the incomeForm
  ngOnInit(): void {
    // Define the structure of the form with validation rules
    this.incomeForm = this.fb.group({
      month: ['', Validators.required], // Month field is required
      source: ['', Validators.required], // Source field is required
      amount: ['', Validators.required], // Amount field is required
      investments: ['', Validators.required] // Investments field is required
    });
  }

  // Method to handle changes in the month dropdown
  onChange(event: any) {
    this.selectedMonth = event.target.value; // Update selectedMonth based on user input
    this.monthSelected = true; // Set monthSelected to true
    this.getFilteredIncomes(); // Call method to filter incomes based on the selected month
  }

  // Method to calculate the total income for a given month
  calculateTotalIncome(month: string): number {
    let totalIncome = 0; // Initialize totalIncome to 0
    for (const income of this.getIncomesForMonth(month)) {
      totalIncome += income.amount; // Add each income amount to totalIncome
    }
    return totalIncome; // Return the calculated total income
  }

  // Method to get incomes based on the selected month
  getIncomesForMonth(month: string): any[] {
    switch (month) {
      case 'January':
        return this.januaryIncomes; // Return incomes for January
      case 'February':
        return this.februaryIncomes; // Return incomes for February
      case 'March':
        return this.marchIncomes; // Return incomes for March
      default:
        return []; // Return an empty array if month is not found
    }
  }

  // Method to filter incomes based on the selected month
  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes]; // Copy January incomes to filteredIncomes
        break;
      case 'February':
        filteredIncomes = [...this.februaryIncomes]; // Copy February incomes to filteredIncomes
        break;
      case 'March':
        filteredIncomes = [...this.marchIncomes]; // Copy March incomes to filteredIncomes
        break;
      default:
        break;
    }
    return filteredIncomes; // Return the filtered incomes
  }

  // Method to handle form submission
  onSubmit() {
    if (this.incomeForm.valid) { // Check if the form is valid
      const newIncome = this.incomeForm.value; // Get form values
      switch (this.selectedMonth) {
        case 'January':
          this.januaryIncomes.push(newIncome); // Add new income to January incomes
          break;
        case 'February':
          this.februaryIncomes.push(newIncome); // Add new income to February incomes
          break;
        case 'March':
          this.marchIncomes.push(newIncome); // Add new income to March incomes
          break;
        default:
          break;
      }
      this.incomeForm.reset(); // Reset the form
      this.incomeForm.patchValue({ month: '', source: '', amount: '', investments: '' }); // Reset form fields
    }
  }

  // Method to save the form data (currently just logs a message)
  saveForm() {
    console.log("Form saved!");
  }

  // Method to navigate back to the dashboard
  onBack() {
    this.router.navigate(['/budget-planner/dashboard']); // Navigate to the dashboard route
  }
}
