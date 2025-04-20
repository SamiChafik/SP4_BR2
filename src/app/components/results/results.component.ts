import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  userName: string = '';
  nameSubmitted: boolean = false;

  constructor(public quizService: QuizService, private router: Router) {}

  saveScore() {
    if (this.userName.trim()) {
      const result = {
        name: this.userName,
        score: this.quizService.score,
        total: this.quizService.questions.length,
        date: new Date().toLocaleString(),
        category: this.quizService.questions[0]?.category || 'General'
      };

      const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      
      history.push(result);
      
      localStorage.setItem('quizHistory', JSON.stringify(history));
      
      this.nameSubmitted = true;
    }
  }

  playAgain() {
    this.quizService.resetQuiz();
    this.router.navigate(['/']);
  }

  viewHistory() {
    this.router.navigate(['/history']);
  }
}