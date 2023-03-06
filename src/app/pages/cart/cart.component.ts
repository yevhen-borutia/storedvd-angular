import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
    discount: string;
    serverUrl = environment.serverUrl;
  constructor(public cartService: CartService) { this.discount = JSON.parse(localStorage.getItem('discount')|| '{}').code || ''; }
  ngOnInit() {
      
  }
  
  onDiscChange(event: any) {
      this.cartService.setDiscount(event).subscribe(() => { 
      this.discount = JSON.parse(localStorage.getItem('discount')|| '{}').code || '' 
      }, err => {
                this.discount = JSON.parse(localStorage.getItem('discount')|| '{}').code || '' 
          });
     
      }
}
