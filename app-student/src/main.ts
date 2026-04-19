import { bootstrapApplication } from '@angular/platform-browser';
import { mergeApplicationConfig } from '@angular/core';

import { App } from './app/app';
import { appConfig } from './app/app.config';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

const primengConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      }
    })
  ]
};

bootstrapApplication(
  App,
  mergeApplicationConfig(appConfig, primengConfig)
).catch(err => console.error(err));
