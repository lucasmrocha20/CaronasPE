import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from './model/usuario';
import { DBService } from './services/db.service';

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

  usuarios: Usuario[];
  usuario: Usuario;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fAuth: AngularFireAuth,
    private dbService: DBService
  ) {
    this.initializeApp();
  }

  logout() {
    this.fAuth.auth.signOut()
    .then(resut => {
      this.router.navigate(["/login"]);
    })
  }

  private async loadUser() {
    this.usuarios = await this.dbService.search<Usuario>('/usuario', 'email', this.usuario.email);
    this.usuario = this.usuarios[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
