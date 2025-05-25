
import { Component, inject } from '@angular/core';
import User from '../types/user';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
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
