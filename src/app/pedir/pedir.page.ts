import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Pedir } from '../model/pedir';

@Component({
  selector: 'app-pedir',
  templateUrl: './pedir.page.html',
  styleUrls: ['./pedir.page.scss'],
})
export class PedirPage implements OnInit {

pedir: Pedir;

  constructor(public keyboard: Keyboard,
    private router: Router,
    public toastController: ToastController,
    private dbService: DBService) {
      this.pedir = new Pedir();
     }

  ngOnInit() {
  }

  salvar() {
    if (this.pedir) {
      this.insert();
    }
  }

  private insert() {
    this.dbService.insertInList<Pedir>('/pedir', this.pedir)
      .then(() => {
        this.presentToast('Registrado com sucesso')
        this.router.navigate(["/historico-pedir"]);
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
