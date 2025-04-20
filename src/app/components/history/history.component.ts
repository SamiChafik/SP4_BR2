import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  history: any[] = [];

  constructor(private router: Router) {
    this.loadHistory();
  }

  loadHistory() {
    const savedHistory = localStorage.getItem('quizHistory');
    this.history = savedHistory ? JSON.parse(savedHistory) : [];
  }

  goHome() {
    this.router.navigate(['/']);
  }

  clear() {
    localStorage.clear();
    this.history = [];
  }
}