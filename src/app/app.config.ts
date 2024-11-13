import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { loggerInterceptor } from './logger.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([loggerInterceptor])),
    provideFirebaseApp(() => initializeApp({ "projectId": "my-code-resources", "appId": "1:1005255827672:web:6a10fcc70f1db5986f37ad", "storageBucket": "my-code-resources.appspot.com", "apiKey": "AIzaSyAzYRiVHa1bphTvdpJbp88Hdbwtn6rTt1g", "authDomain": "my-code-resources.firebaseapp.com", "messagingSenderId": "1005255827672", "measurementId": "G-PQYV4TTM0Q" })),
    provideAnimationsAsync(),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    { provide: ScreenTrackingService, useClass: ScreenTrackingService }
  ]
};