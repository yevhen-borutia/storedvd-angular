import { Component } from '@angular/core';
import { CartItem, CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public cartItems: CartItem[] = [];
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }
}
