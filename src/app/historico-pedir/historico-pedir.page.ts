import { Component, OnInit } from '@angular/core';
import { Pedir } from '../model/pedir';
import { ModalController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';

@Component({
  selector: 'app-historico-pedir',
  templateUrl: './historico-pedir.page.html',
  styleUrls: ['./historico-pedir.page.scss'],
})
export class HistoricoPedirPage implements OnInit {

  historicoP: Pedir[];

  loading: boolean;

  constructor(public modalController: ModalController, 
    public dbService: DBService, 
    public toastController: ToastController) { }

  async ngOnInit() {
    this.loading = true;

    await this.LoadingListaHistoricoP();
}

private async LoadingListaHistoricoP() {
  this.dbService.listWithUIDs<Pedir>('/pedir')
    .then(_LoadingListaHistorico => {
      this.historicoP = _LoadingListaHistorico;

      this.loading = false;
    }).catch(error => {
      console.log(error);
    });

}

async add() {
  const modal = await this.modalController.create({
    component: Pedir
  });

  modal.onDidDismiss()
    .then(result => {
      if (result.data) {
        this.confirmAdd();
      }
    });

  return await modal.present();
}

private confirmAdd() {
  this.presentToast('Adicionado com sucesso');
  this.LoadingListaHistoricoP();
}

remove(uid: string) {
  this.dbService.remove('/pedir', uid)
    .then(() => {
      this.presentToast('Removido com sucesso');
      this.LoadingListaHistoricoP();
    });
}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000
  });
  toast.present();
}

}
