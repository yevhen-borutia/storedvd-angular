import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/models/movie.model';
import { Genre } from 'src/models/genre.model';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd, Event, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

    movies: Array<Movie> | undefined;
    moviesSubscription: Subscription | undefined;
    smoviesSubscription: Subscription | undefined;
    searchSubscription: Subscription | undefined;
    moviesRows: Array<void>|undefined;
    sort: string | undefined;
    up: string | undefined;
    constructor(private titleService:Title,  private storeService: StoreService, private route: ActivatedRoute, private router: Router) { this.kind = ''; this.route.data.subscribe(data => this.kind = data['kind'])}
    genreId: string | undefined;
    genreTitle: string | undefined;
    q: string | undefined;
    kind: string;
    sorting = false;
    onClick(field: string, up: string) {
        if ((field === 'price' || field === 'title') && (up === '1' || up === '0')) {
                   // alert(up);
                    
        up === '1' ? this.movies?.sort((a, b) => (a[field] < b[field] ? -1 : 1)) :
        this.movies?.sort((a, b) => (a[field] > b[field] ? -1 : 1));

        this.sorting = true;
        console.log(this.movies);
        }

//        return false;
        }

    ngOnInit(): void {

        console.log(window.location.pathname);
        this.genreId = this.route.snapshot.params["id"] ?? '';
        let params = this.route.snapshot.queryParamMap;

        if ((params.get('sort') === 'price' || params.get('sort') === 'title') && (params.get('up') === '1' || params.get('up') === '0')) {
            this.sort = params.get('sort') ?? '';
            this.up = params.get('up') ?? '';

        }
        this.route.data.subscribe(data => {
            if (data["kind"] == 'search') {
                this.q = params.get('q') ?? '';

                this.search(this.sort, this.up, this.q);
            }
            else if (data["kind"] === 'section') {
                this.getProducts(this.sort, this.up, this.genreId);
            }
            else {
                this.getProducts(this.sort, this.up, this.genreId);
                }
        });



        //        else {
        //          this.getProducts('','',this.genreId);
        //
        //        }    
        this.smoviesSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.genreId = this.route.snapshot.params["id"] ?? '';
                let params = this.route.snapshot.queryParamMap;

                if ((params.get('sort') === 'price' || params.get('sort') === 'title') && (params.get('up') === '1' || params.get('up') === '0')) {
                    this.sort = params.get('sort') ?? '';
                    this.up = params.get('up') ?? '';
                }
                this.route.data.subscribe(data => {
                  //  alert(2);
                    if (this.sorting) {
//                        alert('sorting');
                        this.sorting = false;
                        }
                    else if (data["kind"] == 'search') {
                        this.q = params.get("q") ?? '';
                        
                        this.search(this.sort, this.up, this.q);

                    }
                    else if (data["kind"] === 'section') {
                        this.getProducts('','',this.genreId,'');
                    }
                    else {
                        this.getProducts();
                        }
                });
            };
        });
    }

    chunkArrayInGroups(arr: Array<any>, size: number): Array<any> {
        var myArray = [];
        for (var i = 0; i < arr.length; i += size) {
            myArray.push(arr.slice(i, i + size));
        }
        return myArray;
    }

    getProducts(sort: string = '', up: string = '', genreId: string = '', q = '', data:any = null): void {
        this.moviesSubscription = this.storeService
            .getAllProducts(sort, up, genreId)
            .subscribe((_movies) => {
//                console.log(_movies['movies']);
              //  this.movies = this.chunkArrayInGroups(_movies.movies, 4);
              this.movies = _movies['movies'];
              const l = this.movies ? Math.ceil(this.movies.length / 4) : 0;
              this.moviesRows = new Array(l);
 
              console.log(this.movies);
                this.genreTitle = _movies.genre == null ? 'New Movies' : _movies.genre.title;
                if ( _movies.genre !== null ) {
                    this.titleService.setTitle(_movies.genre.title);
                    }
            }, error => {
                this.router.navigate(['/404']);
            });
    }

    search(sort: string = '', up: string = '', q = ''): void {
        this.searchSubscription = this.storeService
            .searchMovies(sort, up, q)
            .subscribe((_movies) => {
                this.movies = _movies['movies'];
                              const l = this.movies ? Math.ceil(this.movies.length / 4) : 0;
              this.moviesRows = new Array(l);
                this.genreTitle = _movies.genre == null ? 'Search' : _movies.genre.title;
                                    this.titleService.setTitle('Search: ' + q);

            }, error => {
                this.router.navigate(['/404']);
            });
    }

    ngOnDestroy(): void {
        if (this.moviesSubscription) {
            this.moviesSubscription.unsubscribe();
        }
        if (this.smoviesSubscription) {
            this.smoviesSubscription.unsubscribe();
        }
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
    }
}
