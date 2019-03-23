import { Injectable } from "@angular/core";
// import { HttpClient } from "selenium-webdriver/http";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private baseUrl: string = "http://localhost:3000/users";
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }
  deleteUser(id: number) {
    return this.http.delete<User[]>(this.baseUrl + "/" + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }
  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + "/" + id);
  }
  editUser(user: User) {
    return this.http.put<User>(this.baseUrl + "/" + user.id, user);
  }
}
