
import { Component, inject } from '@angular/core';
import User from '../types/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
users:User[] = [];
userService= inject(UserService);
ngOnInit() {
  this.userService.getUser().subscribe((result:User[]) => {
    this.users = result;
    console.log(this.users);
  });
}
}
