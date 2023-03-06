import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/models/genre.model';
import { Movie } from 'src/models/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

getDeliveryTypes():Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}delivery_types`);
    }

addOrder(formData: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}addorder`, formData);
}

  getAllProducts(
    sort = '',
    up = '',
    genre?: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}movies${
        genre ? '/' + genre : ''
      }?sort=${sort}&up=${up}`
    );
  }
  
    searchMovies(
    sort = '',
    up = '',
    q = ''
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}search?sort=${sort}&up=${up}&q=${q}`
    );
  }

  getAllGenres(): Observable<Array<Genre>> {
    return this.httpClient.get<Array<Genre>>(
      `${environment.apiUrl}genres`
    );
  }
  
    getMovie(id: number): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}movie/${id}`
    );
}
}