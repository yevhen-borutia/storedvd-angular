import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css']
})
export class AddorderComponent implements OnInit{
    
constructor(private route: ActivatedRoute, private router: Router) {
    // ...
}
ngOnInit(): void {
    if (localStorage.getItem('order') !== this.route.snapshot.paramMap.get('id')) {
        this.router.navigate(['404']);
    }

}
}
