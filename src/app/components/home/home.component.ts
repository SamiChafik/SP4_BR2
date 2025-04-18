import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories: any[] = [];
  selectedCategory = 9;
  selectedDifficulty = 'easy';
  selectedNumber = 10;

  constructor(private quizService: QuizService, private router: Router) {
    this.loadCategories();
  }

  loadCategories() {
    this.quizService.getCategories().subscribe((data: any) => {
      this.categories = data.trivia_categories;
    });
  }

  startQuiz() {
    this.quizService.getQuestions(this.selectedCategory, this.selectedDifficulty, this.selectedNumber)
      .subscribe((data: any) => {
        this.quizService.questions = data.results.map((q: any) => ({
          ...q,
          all_answers: this.quizService.shuffleAnswers([...q.incorrect_answers, q.correct_answer])
        }));
        this.router.navigate(['/quiz']);
      });
  }
}