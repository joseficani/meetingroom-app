// // import { bootstrapApplication } from '@angular/platform-browser';
// // import { appConfig } from './app/app.config';
// // import { App } from './app/app';

// // bootstrapApplication(App, appConfig)
// //   .catch((err) => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { App } from './app/app';

// import * as bootstrap from 'bootstrap';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

// document.addEventListener('DOMContentLoaded', () => {
//   const tooltipTriggerList = Array.from(
//     document.querySelectorAll('[data-bs-toggle="tooltip"]')
//   );
//   tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
// });
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { App } from './app/app';
import { appConfig } from './app/app.config';

import * as bootstrap from 'bootstrap';

// Bootstrap the Angular app with animations
bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    ...appConfig.providers
  ]
}).catch(err => console.error(err));

// Initialize Bootstrap tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const tooltipTriggerList = Array.from(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((el) => new bootstrap.Tooltip(el));
});
