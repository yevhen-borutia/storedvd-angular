import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    form;
    delivery_types: any;
    serverErrors: any;
    hide_address: boolean = false;
    constructor(
        public cartService: CartService,
        private formBuilder: FormBuilder,
        private storeService: StoreService,
        private router: Router
    ) {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
            notice: '',
            delivery_type: ['', Validators.required],
            address: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.storeService.getDeliveryTypes().subscribe(res => this.delivery_types = res);
        this.onDeliveryTypeChange();
    }

    private onDeliveryTypeChange(): void {
        this.form.get('delivery_type')?.valueChanges.subscribe(value => {
            const addressControl = this.form.get('address');
            const validators = [Validators.required];

            if (value === 'deli') {
                addressControl?.setValidators(validators);
                this.hide_address = false;
            } else if (value === 'pick') {
                addressControl?.clearValidators();
                this.hide_address = true;
            }
            else {

            }
            addressControl?.updateValueAndValidity();
        });
    }

    get name() { return this.form.get('name'); }

    onSubmit(): void {
//console.log(this.cartService.discount);
//            return;
        if (this.form.valid && this.cartService.getCartItems().length !== 0) {
            const newCart: any = {}; this.cartService.getCartItems().map(el => {
                newCart[el.id] = el.quantity
            });
            
            const formData = this.form.value;
            (formData as any).cart = newCart;
            (formData as any).discount = this.cartService.discount?.id;
            this.storeService.addOrder(this.form.value).subscribe(
                res => {this.cartService.clearCart(); this.cartService.clearDiscount(); localStorage.setItem('order', res); this.router.navigateByUrl('/addorder/'+res);},
                err => {
                    this.serverErrors = err.error.errors
                });
        }
    }
}