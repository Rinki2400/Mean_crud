import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import User from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000';
  httpClient = inject(HttpClient);
  constructor() {}
  getUser() {
    return this.httpClient.get<User[]>(this.apiUrl + '/user');
  }
 addUser(model: User) {
    return this.httpClient.post(this.apiUrl + '/user', model);
}
deleteUser(id: number) {
  return this.httpClient.delete(this.apiUrl + '/user/' + id);
}
getUserById(id: number) {
  return this.httpClient.get<User>(this.apiUrl + '/user/' + id);      
}

updateUser( model: User) {
  return this.httpClient.put(this.apiUrl + '/user', model);

}

}