import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent, canActivate: [MsalGuard] },
  { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [MsalGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
