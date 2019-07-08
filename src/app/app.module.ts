import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RuteRassPage } from '../pages/rute-rass/rute-rass';
import { RuteMapPage } from '../pages/rute-map/rute-map';
import { TransportasiPage } from '../pages/transportasi/transportasi';
import { PeraturanRassPage } from '../pages/peraturan-rass/peraturan-rass';
import { DetailPeraturanPage } from '../pages/detail-peraturan/detail-peraturan';
import { InfoPage } from '../pages/info/info';
import { FasilitasRassPage } from '../pages/fasilitas-rass/fasilitas-rass';
import { WelcomePage } from '../pages/welcome/welcome';
import { HostProvider } from '../providers/host/host';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RuteRassPage,
    TransportasiPage,
    RuteMapPage,
    PeraturanRassPage,
    InfoPage,
    DetailPeraturanPage,
    FasilitasRassPage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RuteRassPage,
    TransportasiPage,
    RuteMapPage,
    PeraturanRassPage,
    InfoPage,
    DetailPeraturanPage,
    FasilitasRassPage,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HostProvider,
    Geolocation
  ]
})
export class AppModule {}
