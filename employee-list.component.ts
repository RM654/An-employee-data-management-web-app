import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: data => {
        this.employees = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching employees', err);
        this.errorMessage = 'Failed to load employees.';
        this.loading = false;
      }
    });
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(emp => emp.id !== id);
      },
      error: err => {
        console.error('Error deleting employee', err);
        alert('Failed to delete employee.');
      }
    });
  }
}
