import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ScriptSocialAppModule } from "./modules/script-social-app.module";
import '@angular/compiler';
import { environment } from "./environments/environment";
import { enableProdMode } from "@angular/core";

if (environment.production) {
    enableProdMode();
}

console.log('main.ts loaded');

platformBrowserDynamic().bootstrapModule(ScriptSocialAppModule)
    .catch(err => console.error(err));
