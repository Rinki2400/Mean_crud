import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import User from '../../types/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersFormComponent {
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', Validators.min(0)],
      address: ['', Validators.required],
    });
  }
  userSevice = inject(UserService);
  addUser() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
      const model:User = this.userForm.value as User;
      this.userSevice.addUser(model).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding user:', error);
        },
      });

      
    } else {
      console.log('Form is invalid');
    }
  }
  
  resetForm() {
    this.userForm.reset();
  }

};
