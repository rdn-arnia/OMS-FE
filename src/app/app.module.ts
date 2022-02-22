import { environment } from './../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import { MsalInterceptor, MsalModule, MsalRedirectComponent, MsalGuard } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    TopBarComponent,
    ProductComponent,
    ShoppingCartComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MsalModule.forRoot( new PublicClientApplication({
			auth: {
				clientId: 'a07a691a-684b-4898-933a-8d222f7dcb2d',
        postLogoutRedirectUri: '/'
			},
			cache: {
				cacheLocation: 'localStorage',
				storeAuthStateInCookie: false,
			}
		}), {
			interactionType: InteractionType.Redirect,
			authRequest: {
				scopes: ['api://27dc4701-06b3-453d-b323-b73964f71f86/.default']
			}
		}, {
			interactionType: InteractionType.Redirect,
			protectedResourceMap: new Map([ 
				[environment.apiUrl + '/catalogs/current', ['api://27dc4701-06b3-453d-b323-b73964f71f86/Order']],
				[environment.apiUrl + '/catalogitems', ['api://27dc4701-06b3-453d-b323-b73964f71f86/Order']],
				[environment.apiUrl + '/product', ['api://27dc4701-06b3-453d-b323-b73964f71f86/Order']],
				[environment.apiUrl + '/orders', ['api://27dc4701-06b3-453d-b323-b73964f71f86/Order']],
			])
		})
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }, MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
