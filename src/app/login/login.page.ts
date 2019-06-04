import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController, MenuController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  usuario: Usuario;
  cadastro: Usuario;

  constructor(public keyboard: Keyboard,
    private router: Router,
    public toastController: ToastController,
    private afAuth: AngularFireAuth,
    private menuCntrl: MenuController) {
      this.usuario = new Usuario;
      this.cadastro = new Usuario;
     }

  ngOnInit() {
    this.menuCntrl.enable(false);
  }

  segmentChanged(event: any){
    if(event.detail.value === "login"){
      this.slides.slidePrev();
    }else{
      this.slides.slideNext();
    }

  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.usuario.email, this.usuario.senha)
    .then(result =>{
      this.router.navigate(["/menu"]);
    }).catch(err =>{
      this.presentToast('E-mail ou senha inválido(s).')
      delete this.usuario.senha;
    })
  }

  cadastrar(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.cadastro.email, this.cadastro.senha)
    .then(result =>{
      this.presentToast('Usuário criado com sucesso.')

    }).catch(err =>{
      this.presentToast('Erro ao cadastrar usuário.')
      console.log(err);
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
