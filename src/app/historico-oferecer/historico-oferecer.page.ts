import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Oferecer } from '../model/oferecer';

@Component({
  selector: 'app-historico-oferecer',
  templateUrl: './historico-oferecer.page.html',
  styleUrls: ['./historico-oferecer.page.scss'],
})
export class HistoricoOferecerPage implements OnInit {

  historicoO: Oferecer[];

  loading: boolean;

  constructor(public modalController: ModalController, 
    public dbService: DBService, 
    public toastController: ToastController) { }

    async ngOnInit() {
      this.loading = true;
  
      await this.LoadingListaHistorico();
  }

  private async LoadingListaHistorico() {
    this.dbService.listWithUIDs<Oferecer>('/oferecer')
      .then(_LoadingListaHistorico => {
        this.historicoO = _LoadingListaHistorico;

        this.loading = false;
      }).catch(error => {
        console.log(error);
      });

  }

  async add() {
    const modal = await this.modalController.create({
      component: Oferecer
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
    this.LoadingListaHistorico();
  }

  remove(uid: string) {
    this.dbService.remove('/oferecer', uid)
      .then(() => {
        this.presentToast('Removido com sucesso');
        this.LoadingListaHistorico();
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
