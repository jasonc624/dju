import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { OpenAiService } from "./open-ai.service";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from "@angular/fire/analytics";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  provideAppCheck,
} from "@angular/fire/app-check";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { getDatabase, provideDatabase } from "@angular/fire/database";
import { getFunctions, provideFunctions } from "@angular/fire/functions";
import { getMessaging, provideMessaging } from "@angular/fire/messaging";
import { getPerformance, providePerformance } from "@angular/fire/performance";
import { getStorage, provideStorage } from "@angular/fire/storage";
import {
  getRemoteConfig,
  provideRemoteConfig,
} from "@angular/fire/remote-config";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { MatButtonModule } from "@angular/material/button";
let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>((resolve) => {
  resolvePersistenceEnabled = resolve;
});
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "dj-u-b5c03",
        appId: "1:370462437523:web:b917a70f21c36096c45d66",
        storageBucket: "dj-u-b5c03.appspot.com",
        apiKey: "AIzaSyCyo1k3YhbCiyXKH5nRaYKmeVhNHz1BC34",
        authDomain: "dj-u-b5c03.firebaseapp.com",
        messagingSenderId: "370462437523",
        measurementId: "G-XS5FT3TTFG",
      }),
    ),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    // provideAppCheck(() => {
    // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
    //   const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
    //   return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    // }),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
  providers: [
    OpenAiService,
    ScreenTrackingService,
    UserTrackingService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
