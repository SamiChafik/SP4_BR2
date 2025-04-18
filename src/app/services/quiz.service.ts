import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://opentdb.com';
  questions: any[] = [];
  currentQuestionIndex = 0;
  score = 0;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}/api_category.php`);
  }

  getQuestions(category: number, difficulty: string, number: number) {
    return this.http.get(
      `${this.apiUrl}/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
  }

  shuffleAnswers(answers: string[]) {
    return [...answers].sort(() => Math.random() - 0.5);
  }
}