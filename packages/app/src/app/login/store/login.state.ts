import { State, Selector, Action, NgxsOnInit, Store, StateContext } from "@ngxs/store";
import { GithubService } from "../services/github.service";
import * as actions from "./login.actions";
import { AngularFireAuth } from "angularfire2/auth";
import { Router, ActivatedRoute } from "@angular/router";
import { GithubUser } from "../../shared/model/github-user.interface";
import { User } from "../../shared/model/user.interface";

export interface LoginStateModel {
  user: User;
}

@State<LoginStateModel>({
  name: "login",
  defaults: { user: null }
})
export class LoginState implements NgxsOnInit {
  constructor(
    private githubService: GithubService,
    private store: Store,
    private afAuth: AngularFireAuth,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngxsOnInit() {
    this.afAuth.user.subscribe(async (user: firebase.User) => {
      const githubUser: GithubUser = await this.githubService.getUserInfo(user.providerData[0].uid);
      this.store.dispatch(new actions.SetUser({ ...user, githubUser }));
      if (user) {
        this.router.navigateByUrl("lobby");
        return;
      }
      this.router.navigateByUrl("");
    });
  }

  @Selector()
  static user(state: LoginStateModel): firebase.User {
    return state.user;
  }

  @Action(actions.SetUser)
  setUser(ctx: StateContext<LoginStateModel>, { user }: actions.SetUser): void {
    ctx.patchState({ user });
  }

  @Action(actions.Logout)
  logout(ctx: StateContext<LoginStateModel>): void {
    return this.githubService.logout();
  }

  @Action(actions.Login)
  login(ctx: StateContext<LoginStateModel>): void {
    return this.githubService.login();
  }
}
