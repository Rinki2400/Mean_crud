import { Component, inject, OnInit } from '@angular/core';
import User from '../types/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userService = inject(UserService);
  ngOnInit() {
    this.userService.getUser().subscribe((result: User[]) => {
      this.users = result;
      console.log(this.users);
    });
  }
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter((user) => user._id !== id);
        console.log('User successfully deleted');
      });
    } else {
      console.log('User deletion cancelled');
    }
  }
}
