import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { SectionsComponent } from './components/sections/sections.component';
import { FooterComponent } from './components/footer/footer.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { StoreService } from 'src/app/services/store.service';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './pages/index/index.component';
import { MovieBoxComponent } from './components/movie-box/movie-box.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { AddorderComponent } from './pages/addorder/addorder.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopmenuComponent,
    SectionsComponent,
    FooterComponent,
    DeliveryComponent,
    ContactsComponent,
    CartComponent,
    OrderComponent,
    IndexComponent,
    MovieBoxComponent,
    PagenotfoundComponent,
    MovieComponent,
    AddToCartButtonComponent,
    AddorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
