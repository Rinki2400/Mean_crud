import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import User from '../../types/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  editUserId!: number;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', [Validators.min(0)]], 
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.editUserId = this.route.snapshot.params['id'];
    if (this.editUserId) {
      this.userService.getUserById(this.editUserId).subscribe({
        next: (result) => {
          this.userForm.patchValue(result);
        },
        error: (error) => {
          console.error('Error fetching user:', error);
        },
      });
    }
  }

  addUser() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      const model: User = this.userForm.value as User;
      this.userService.addUser(model).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding user:', error);
          alert(`Error: ${error.message}`);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const model: User = this.userForm.value as User;
      model._id = this.editUserId;

      this.userService.updateUser(model).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.userForm.reset();
    this.router.navigate(['/users']);
  }
}