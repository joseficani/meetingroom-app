import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    ...appConfig.providers
  ]
}).catch(err => console.error(err));
