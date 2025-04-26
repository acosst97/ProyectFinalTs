import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpErrorResponse, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes),
   provideHttpClient(
    withFetch(),
    
   ) ,
   provideRouter(routes)
  ]
};
