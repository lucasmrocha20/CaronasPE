import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoricoOferecerPage } from './historico-oferecer.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoOferecerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoricoOferecerPage]
})
export class HistoricoOferecerPageModule {}
