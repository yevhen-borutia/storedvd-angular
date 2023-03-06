import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie.model';
import { Genre } from 'src/models/genre.model';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd, Event, RouterEvent } from '@angular/router';
import { environment } from 'src/environments/environment';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
    constructor(private titleService: Title, private storeService: StoreService, private route: ActivatedRoute, private router: Router){}
    movie: Movie | undefined;
        movies: Array<Movie> | undefined;
        serverUrl = environment.serverUrl;
    genre: Genre | undefined;
      movieSubscription: Subscription | undefined;
id: number | undefined;
      sub: Subscription | undefined;

  ngOnInit(): void {
      
          this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    this.movieSubscription = this.storeService
      .getMovie(this.id)
      .subscribe((response: any) => {
        this.movie = response.movie;
        this.genre = response.section;
        this.movies = response.otherMovies;
        this.titleService.setTitle(response.movie.title);
      }, error => {    this.router.navigate(['/404']);
  });
  });
      
  }

  ngOnDestroy(): void {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
