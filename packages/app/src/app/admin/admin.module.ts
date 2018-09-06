import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRouting } from "./admin.routing";
import { OverviewComponent } from "./pages/overview/overview.component";
import { ElementsComponent } from "./pages/elements/elements.component";
import { MediaComponent } from "./pages/media/media.component";
import { PagesComponent } from "./pages/pages/pages.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  imports: [CommonModule, AdminRouting],
  declarations: [
    OverviewComponent,
    ElementsComponent,
    MediaComponent,
    PagesComponent,
    SettingsComponent,
    AdminComponent
  ]
})
export class AdminModule {}