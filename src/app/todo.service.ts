import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // إضافة مهمة جديدة
  addTask(task: { task: string }): Observable<any> {
    return this.http.post(this.apiUrl, task); // JSON Server يضيف `id` تلقائيًا
  }

  // تعديل المهمة
  updateTask(id: number, updatedTask: { completed: boolean }): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, updatedTask);
  }

  // حذف مهمة
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
