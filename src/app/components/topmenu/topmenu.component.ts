import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent {
q: string | undefined;

constructor(private router: Router) {
    this.q = 'search';}

searchThis() {
    let search = this.q;
    this.q = 'search';
this.router.navigateByUrl("/search?q="+search);

}
}
