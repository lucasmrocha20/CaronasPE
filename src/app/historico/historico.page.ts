import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.service';
import { Op } from '../model/op';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  historico: Op[];

  loading: boolean;


  constructor(public modalController: ModalController, 
    public dbService: DBService, 
    public toastController: ToastController) { }

    async ngOnInit() {
      this.loading = true;
  
      await this.LoadingListaHistorico();
    }
    
    private async LoadingListaHistorico() {
      this.dbService.listWithUIDs<Op>('/op')
        .then(_LoadingListaHistorico => {
          this.historico = _LoadingListaHistorico;
  
          this.loading = false;
        }).catch(error => {
          console.log(error);
        });
  
    }
  
  
  
    async add() {
      const modal = await this.modalController.create({
        component: Op
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
      this.dbService.remove('/op', uid)
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