import { Page } from "shared";

export class GetPages {
  static readonly type = "[Admin] [Pages] Get Pages";
  constructor(
    private username: string,
    private site: string,
    private path: string
  ) {}
}

export class ChangePath {
  static readonly type = "[Admin] [Pages] Change Path";
  constructor(private path: string[]) {}
}

export class GetPageTemplates {
  static readonly type = "[Admin] Get Page Templates";
  constructor(private username: string, private site: string) {}
}

export class GetFolders {
  static readonly type = "[Admin] Get Folders";
  constructor(private username: string, private site: string) {}
}

export class GetSinglePage {
  static readonly type = "[Admin] [Page] Get Single Page";
  constructor(
    private username: string,
    private site: string,
    private id: string
  ) {}
}

export class GetSectionTemplates {
  static readonly type = "[Admin] [Page ] Get Section Templates";
  constructor(
    private username: string,
    private site: string,
    private pageId: string
  ) {}
}

export class BuildSite {
  static readonly type = "[Admin] Build Site";
  constructor(private username: string, private site: string) {}
}

export class PublishSite {
  static readonly type = "[Admin] Publish Site";
  constructor(private username: string, private site: string) {}
}

export class SavePage {
  static readonly type = "[Admin] [Page] Save Page";
  constructor(
    private username: string,
    private site: string,
    private id: string,
    private page: Page
  ) {}
}

export class CreatePage {
  static readonly type = "[Admin] [Page] Create Page";
  constructor(
    private username: string,
    private site: string,
    private title: string,
    private path: string,
    private template: string,
    private isIndex: boolean
  ) {}
}

export class CreateSection {
  static readonly type = "[Admin] [Page] Create Section";
  constructor(
    private username: string,
    private site: string,
    private pageId: string,
    private title: string,
    private description: string,
    private template: string
  ) {}
}

export class InitSave {
  static readonly type = "[Admin] Intialize Page Save";
  constructor(private initSave: boolean) {}
}

export class GetMedia {
  static readonly type = "[Admin] [Media] Get Media";
  constructor(private username: string, private site: string) {}
}

export class RemoveMedia {
  static readonly type = "[Admin] [Media] Remove Media";
  constructor(
    private username: string,
    private site: string,
    private mediaName: string
  ) {}
}
