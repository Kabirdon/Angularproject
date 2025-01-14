import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  //Income
  lastMonthsIncome = ['January:$1000', 'Feburary: $1500', ' March:$1200'];
  currentMonthIncome = '$1200';

  //Expense
  lastMonthsExpense = ['January:$100', 'Feburary: $1000', ' March:$1200'];
  currentMonthExpense = '$1200';

  //todo transaaction
  todoTransactions= [
    {description: 'Pay electric bill'},
    {description: 'Submit monthly report'},
    {description: 'Buy groceries'},
    {description: 'Call insurance company'},
  ];
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 2000;
  constructor(public router: Router) { }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }
  onExpense() {
    this.router.navigate(['/budget-planner/income']);
  }
  onTodo() {
    this.router.navigate(['/budget-planner/todo']);
  }
  get currentMonthSavings(): number{
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
