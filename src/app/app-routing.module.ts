import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'mensagens', loadChildren: './mensagens/mensagens.module#MensagensPageModule' },
  { path: 'pedir', loadChildren: './pedir/pedir.module#PedirPageModule' },
  { path: 'oferecer', loadChildren: './oferecer/oferecer.module#OferecerPageModule' },
  { path: 'historico-oferecer', loadChildren: './historico-oferecer/historico-oferecer.module#HistoricoOferecerPageModule' },
  { path: 'historico-pedir', loadChildren: './historico-pedir/historico-pedir.module#HistoricoPedirPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
