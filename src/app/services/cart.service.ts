import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment'

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export interface Discount {
  id: number;
  code: string;
  value: number;   
}

const CART_KEY = 'cart';
const DISCOUNT_KEY = 'discount';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();
  public discount: Discount | undefined;
   
  constructor(private httpClient: HttpClient) {
    const cartData = localStorage.getItem(CART_KEY);
    const disc = localStorage.getItem(DISCOUNT_KEY);
    if (disc) {
        this.discount = JSON.parse(disc);
    }
else {
    this.discount = undefined;
    }
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      this.cartItemsSubject.next(cartItems);
    }
  }

public getDiscountCode() {
  return this.discount ? this.discount.code : '';   
}

public setDiscount(code: any): Observable<Discount>{
     return this.httpClient.get<Discount>(
      `${environment.apiUrl}discount?discount=${code.target.value}`
    ).pipe(map(res => {
        this.discount = res;
            localStorage.setItem(DISCOUNT_KEY, JSON.stringify(this.discount));
return res;
    
    }),catchError(err =>  {      console.log(this.discount?.code); this.discount = undefined;
            localStorage.removeItem(DISCOUNT_KEY);       return throwError(this.discount);
 }));
  }

public changeQuantity(item: CartItem, newQuantityy: any) {
  const newQuantity = parseInt(newQuantityy.target.value, 10);
  if (!isNaN(newQuantity) && newQuantity > 0) {
    item.quantity = newQuantity;
     const cartItems = this.cartItemsSubject.value;
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
          cartItems[index].quantity = newQuantity;
                this.cartItemsSubject.next(cartItems);
    localStorage.setItem(CART_KEY, JSON.stringify(this.cartItemsSubject.value));
  }
}

  public addToCart(item: CartItem): void {
    const cartItems = this.cartItemsSubject.value;
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      this.cartItemsSubject.next([...cartItems, { ...item, quantity: 1 }]);
    } else {
      cartItems[index].quantity++;
      this.cartItemsSubject.next(cartItems);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(this.cartItemsSubject.value));
  }

  public removeFromCart(item: CartItem): void {
    const cartItems = this.cartItemsSubject.value;
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {

        cartItems.splice(index, 1);
      this.cartItemsSubject.next(cartItems);
      localStorage.setItem(CART_KEY, JSON.stringify(this.cartItemsSubject.value));
    }
  }

  public clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem(CART_KEY);
  }
  
  public clearDiscount(): void {
      this.discount = undefined;
    localStorage.removeItem(DISCOUNT_KEY);
  }

  public getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  public getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.price * item.quantity, 0) * (this.discount ? this.discount.value : 1);
  }
  
    public getQuantity(): number {
    let cartItems = this.cartItemsSubject.getValue();
    let quantity = 0;

    for (let item of cartItems) {
      quantity += item.quantity;
    }

    return quantity;
  }
}
