import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  isSlideOut: boolean = true;

  constructor(private router: Router) {}

  toggleSlideOut(): void {
    this.isSlideOut = !this.isSlideOut;
  }

  onDash() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  onProfile() {
    this.router.navigate(['/budget-planner/profile']);
  }

  onHistory() {
    this.router.navigate(['/budget-planner/history']);
  }

  onLogout() {
    this.router.navigate(['/budget-planner/login']);
  }
  onBlog() {
    this.router.navigate(['/budget-planner/Blog']);
  }
}
