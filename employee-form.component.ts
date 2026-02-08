import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      position: ['', Validators.required],
      age: [
        null,
        [Validators.required, Validators.min(18)]
      ],
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.employeeId = +idParam;
        this.employeeService.getEmployee(this.employeeId).subscribe({
          next: employee => {
            // Patch form with retrieved data
            this.employeeForm.patchValue(employee);
          },
          error: err => {
            console.error('Error loading employee', err);
            // optionally redirect or show message
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      // mark all controls as touched to show validation errors
      this.employeeForm.markAllAsTouched();
      return;
    }

    const employee: Employee = this.employeeForm.value;

    if (this.isEditMode) {
      this.employeeService.updateEmployee(employee).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Error updating employee', err);
        }
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Error adding employee', err);
        }
      });
    }
  }
}
