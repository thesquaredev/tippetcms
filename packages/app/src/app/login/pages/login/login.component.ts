import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { Login, Logout } from "../../store/login.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}

  login() {
    this.store.dispatch(Login);
  }

  logout() {
    this.store.dispatch(Logout);
  }
}
