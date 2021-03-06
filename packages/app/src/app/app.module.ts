import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgxsModule } from "@ngxs/store";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminModule } from "./admin/admin.module";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { LoginModule } from "./login/login.module";
import { LobbyModule } from "./lobby/lobby.module";
import { AngularFireModule } from "angularfire2";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "angularfire2/auth";
import { LoginState } from "./login/store/login.state";
import { LobbyState } from "./lobby/store/lobby.state";
import { AdminState } from "./admin/store/admin.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { PagesState } from "./admin/store/children/pages.state";
import { SinglePageState } from "./admin/store/children/single-page.state";
import { MediaState } from "./admin/store/children/media.state";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    LobbyModule,
    AdminModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      LoginState,
      LobbyState,
      AdminState,
      PagesState,
      SinglePageState,
      MediaState
    ]),
    NgxsStoragePluginModule.forRoot({
      key: "login.token"
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
