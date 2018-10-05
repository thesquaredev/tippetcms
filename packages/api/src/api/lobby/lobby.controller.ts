import { Controller, Get, HttpCode, Param, Post, Body } from '@nestjs/common';
import { readdirSync, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { mkdirpSync, copy, readFileSync } from 'fs-extra';
import * as execa from 'execa';
import { GetSitesResponse } from 'shared';
// import { PagesService, TippetFile } from '../admin/pages.service';

@Controller('lobby')
export class LobbyController {
  constructor() {}

  @Get(':username')
  getSites(@Param('username') username): GetSitesResponse {
    const publicDirToCheck = join(__dirname, '../..', 'public', username);
    const sitesDirToCheck = join(__dirname, '../..', 'sites', username);

    if (existsSync(publicDirToCheck) && existsSync(sitesDirToCheck)) {
      const sites = readdirSync(sitesDirToCheck).filter(dir => dir !== '.keep');
      return { existed: true, created: false, sites };
    }
    mkdirpSync(publicDirToCheck);
    mkdirpSync(sitesDirToCheck);
    return { existed: false, created: true };
  }

  @Post()
  async addSite(@Body()
  body: {
    username: string;
    siteName: string;
    siteTemplate: string;
  }): Promise<{ success: boolean; reason?: any }> {
    const basePath = [__dirname, '../..'];
    const variablePath = [body.username, body.siteName];
    //TODO: should change according to startup chosen by user
    const templateUrl = 'https://github.com/thesquaredev/startup-gatsbyjs-template.git';
    const publicDirForSite = join(...basePath, 'public', ...variablePath);
    const sitesDirForSite = join(...basePath, 'sites', ...variablePath);
    try {
      console.log(`Start cloning ${templateUrl} template from GitHub`);
      await execa.shell(`git clone ${templateUrl} ${sitesDirForSite}`);
      console.log('Clone done, installing dependencies');
      await execa('npm', ['install'], { cwd: sitesDirForSite });
      console.log('Installing dependencies done, creating pages');
      // const siteJsonPath = join(sitesDirForSite, 'src', 'data', 'site.json');
      // const siteData: any = JSON.parse(readFileSync(siteJsonPath, 'utf8'));
      // this.createPages(siteData, body.username, body.siteName);
      console.log(
        `Creating pages done, start gatsby build for user ${body.username} and site ${
          body.siteName
        }`,
      );
      // await execa('gatsby', ['build'], { cwd: sitesDirForSite });
      await execa('gatsby', ['build', '--prefix-paths'], {
        cwd: sitesDirForSite,
        env: Object.assign({}, process.env, {
          PATH_PREFIX: `/${body.username}/${body.siteName}`
        })
      });
      console.log('Build done, start copying site to public folder');
      copy(`${sitesDirForSite}/public`, publicDirForSite);
      console.log('Copy done');
      return { success: true };
    } catch (e) {
      console.log("Something went wrong, rolling back");
      await execa.shell(`rm -rf ${sitesDirForSite}`);
      await execa.shell(`rm -rf ${publicDirForSite}`);
      return { success: false, reason: e };
    }
  }

  @Post()
  async buildSite(@Body() body: { username: string; siteName: string }): Promise<{
    success: boolean;
    reason?: any;
  }> {
    const basePath = [__dirname, '../..'];
    const variablePath = [body.username, body.siteName];
    const publicDirForSite = join(...basePath, 'public', ...variablePath);
    const sitesDirForSite = join(...basePath, 'sites', ...variablePath);

    try {
      const foo = `/${body.username}/${body.siteName}`;
      console.log(foo);
      await execa('gatsby', ['build', '--prefix-paths'], {
        cwd: sitesDirForSite,
        env: Object.assign({}, process.env, {
          PATH_PREFIX: `/${body.username}/${body.siteName}`
        })
      });
      // await execa('gatsby', ['build'], { cwd: sitesDirForSite });
      copy(`${sitesDirForSite}/public`, publicDirForSite);

      return { success: true };
    } catch (e) {
      return { success: false, reason: e };
    }
  }

  // TODO: Remove this if not used
  // private createPages(siteData, username, site) {
  //   siteData.templates.map(template => {
  //     this.pagesService.addPage(
  //       username,
  //       site,
  //       template.title,
  //       this.pagesService.getPathFromSlug(template.slug),
  //       template.name,
  //     );
  //   });
  // }
}
