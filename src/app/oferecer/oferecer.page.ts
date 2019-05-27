import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Oferecer } from '../model/oferecer';

@Component({
  selector: 'app-oferecer',
  templateUrl: './oferecer.page.html',
  styleUrls: ['./oferecer.page.scss'],
})
export class OferecerPage implements OnInit {

  oferecer: Oferecer;

  constructor(public keyboard: Keyboard,
    private router: Router,
    public toastController: ToastController,
    private dbService: DBService) { 
      this.oferecer = new Oferecer();
    }

  ngOnInit() {
  }

  salvar() {
    if (this.oferecer) {
      this.insert();
    }
  }

  private insert() {
    this.dbService.insertInList<Oferecer>('/oferecer', this.oferecer)
      .then(() => {
        this.presentToast('Registrado com sucesso')
        this.router.navigate(["/historico-oferecer"]);
      }).catch(error => {
        console.log(error);
      })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
