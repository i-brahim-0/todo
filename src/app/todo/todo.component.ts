import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks: { id: number; task: string; completed: boolean }[] = [];
  newTask: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(): void {
    if (this.newTask.trim()) {
      const newTask = { task: this.newTask }; // إزالة `id` تمامًا
      this.todoService.addTask(newTask).subscribe((task) => {
        this.tasks.push(task); // سيتم إرجاع المهمة الجديدة مع ID من JSON Server
        this.newTask = '';
      });
    }
  }

  toggleTaskCompletion(task: {
    id: number;
    task: string;
    completed: boolean;
  }): void {
    const updatedTask = { completed: !task.completed };
    this.todoService.updateTask(task.id, updatedTask).subscribe(() => {
      task.completed = !task.completed; // تحديث الحالة في الواجهة بعد نجاح الطلب
    });
  }

  deleteTask(id: number): void {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
