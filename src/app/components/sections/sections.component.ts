import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { Genre } from 'src/models/genre.model';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent {
  genres: Genre[] | undefined;
  genresSubscription: Subscription | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.genresSubscription = this.storeService
      .getAllGenres()
      .subscribe((response: Array<Genre>) => {
        this.genres = response;
      });
  }

  ngOnDestroy(): void {
    if (this.genresSubscription) {
      this.genresSubscription.unsubscribe();
    }
  }
}
