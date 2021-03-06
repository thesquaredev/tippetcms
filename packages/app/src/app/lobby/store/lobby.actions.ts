import { NewProjectData } from "../components/add-project-dialog/add-project-dialog.component";

export class GetSites {
  static readonly type = "[Lobby] Get Sites";
  constructor(private username: string) {}
}

export class AddSite {
  static readonly type = "[Lobby] Add Site";
  constructor(private newProjectData: NewProjectData) {}
}

export class RemoveSite {
  static readonly type = "[Lobby] Remove Site";
  constructor(private user: string, private site: string) {}
}
