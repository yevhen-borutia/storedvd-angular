import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component'
import { DeliveryComponent } from 'src/app/pages/delivery/delivery.component'
import { ContactsComponent } from 'src/app/pages/contacts/contacts.component'
import { CartComponent } from 'src/app/pages/cart/cart.component'
import { OrderComponent } from 'src/app/pages/order/order.component'
import { IndexComponent } from 'src/app/pages/index/index.component'
import { PagenotfoundComponent } from 'src/app/pages/pagenotfound/pagenotfound.component'
import { MovieComponent } from 'src/app/pages/movie/movie.component'
import { AddorderComponent } from 'src/app/pages/addorder/addorder.component'

const routes: Routes = [
{
    path: '',
    component: IndexComponent, 
    title: 'Online Store'
},
{
    path: 'delivery',
    component: DeliveryComponent,
    title: 'Payment and Delivery'
},
{
    path: 'contacts',
    component: ContactsComponent,
    title: 'Contacts'
},
{
    path: 'cart',
    component: CartComponent,
    title: 'Cart'
},
{
    path: 'order',
    component: OrderComponent,
    title: 'Checkout'
},
  { 
  path: 'section/:id', component: IndexComponent, data: { kind: 'section' }
   },
     { 
  path: 'search', component: IndexComponent, data: { kind: 'search' }
   },
     { 
  path: 'product/:id', component: MovieComponent
   },
   {
     path: 'addorder/:id', component: AddorderComponent, title: 'Your order is accepted'
   },
    {path: '404', component: PagenotfoundComponent, title: 'Not found' },
 {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
