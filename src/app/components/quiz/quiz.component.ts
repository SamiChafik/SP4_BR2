import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  selectedAnswer: string | null = null;
  isCorrect: boolean | null = null;

  get currentQuestion() {
    return this.quizService.questions[this.quizService.currentQuestionIndex];
  }

  get isLastQuestion() {
    return this.quizService.currentQuestionIndex === this.quizService.questions.length - 1;
  }

  constructor(public quizService: QuizService, private router: Router) {}

  checkAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.isCorrect = answer === this.currentQuestion.correct_answer;
    
    if (this.isCorrect) {
      this.quizService.score++;
    }
  }

  nextQuestion() {
    this.selectedAnswer = null;
    this.isCorrect = null;
    
    if (this.isLastQuestion) {
      setTimeout(() => {
        this.router.navigate(['/']);
        this.quizService.currentQuestionIndex = 0;
        this.quizService.score = 0;
      }, 1000);
    } else {
      this.quizService.currentQuestionIndex++;
    }
  }
}