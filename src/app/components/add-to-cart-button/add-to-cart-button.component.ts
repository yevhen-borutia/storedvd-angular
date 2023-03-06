import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Movie } from 'src/models/movie.model';

@Component({
  selector: 'app-add-to-cart-button',
  templateUrl: './add-to-cart-button.component.html',
  styleUrls: ['./add-to-cart-button.component.css']
})
export class AddToCartButtonComponent {
    @Input() movie!: Movie;
        constructor(private cartService: CartService){}

    onAddToCart(movie: Movie) {
        this.cartService.addToCart({
            id: movie.id,
            name: movie.title,
            price: movie.price,
            quantity: 1,
            img: movie.img
            });
    }
}
