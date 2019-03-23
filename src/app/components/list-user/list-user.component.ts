import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { User } from "src/app/model/user";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"]
})
export class ListUserComponent implements OnInit {
  constructor(private userservice: UserService, private router: Router) {}
  users: User[];

  ngOnInit() {
    if (localStorage.getItem("username") != null) {
      this.userservice.getUsers().subscribe(data => {
        this.users = data;
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }
  deleteUser(user: User): void {
    let result = confirm("Are you sure you want ot delete ?");
    if (result) {
      this.userservice.deleteUser(user.id).subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      });
    }
  }

  logOutUser(): void {
    if (localStorage.getItem("username") != null) {
      localStorage.removeItem("username");
      this.router.navigate(["/login"]);
    }
  }

  addUser(): void {
    this.router.navigate(["add-user"]);
  }
  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(["edit-user"]);
  }
}
