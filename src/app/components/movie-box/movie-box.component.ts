import { Component, Input } from '@angular/core';
import { Movie } from 'src/models/movie.model';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-movie-box',
  templateUrl: './movie-box.component.html',
  styleUrls: ['./movie-box.component.css']
})
export class MovieBoxComponent {
    serverUrl = environment.serverUrl;
  @Input() movie: Movie | undefined;

}
