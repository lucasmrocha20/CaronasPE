import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Perfil',
      url: '/perfil',
      icon: 'contact'
    },
    {
      title: 'Oferecer Carona',
      url: '/oferecer',
      icon: 'logo-model-s'
    },
    {
      title: 'Pedir Carona',
      url: '/pedir',
      icon: 'logo-model-s'
    },
    {
      title: 'Histórico Oferecer',
      url: '/historico-oferecer',
      icon: 'list',
    },
    {
      title: 'Histórico Pedir',
      url: '/historico-pedir',
      icon: 'list',
    },
    {
      title: 'Mensagens',
      url: '/mensagens',
      icon: 'paper-plane'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  logout() {
    this.fAuth.auth.signOut()
    .then(resut => {
      this.router.navigate(["/login"]);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
