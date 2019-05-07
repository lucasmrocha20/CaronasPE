import { Component, OnInit, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Op } from '../model/op';
import { DBService } from '../services/db.service';

@Component({
  selector: 'app-op',
  templateUrl: './op.page.html',
  styleUrls: ['./op.page.scss'],
})
export class OpPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  op: Op;

  constructor(public keyboard: Keyboard,
    private router: Router,
    public toastController: ToastController,
    private afAuth: AngularFireAuth,
    private dbService: DBService) {
    this.op = new Op;
  }

  ngOnInit() { }

  salvar() {
    if (this.op) {
      this.insert();
    }
  }

  private insert() {
    this.dbService.insertInList<Op>('/op', this.op)
      .then(() => {
        this.presentToast('Registrado com sucesso')
        this.router.navigate(["/historico"]);
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
