import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  constructor(private menuCntrl: MenuController) { }

  ionViewWillEnter() {
    this.menuCntrl.enable(true);
  }
  
}
