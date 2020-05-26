import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BookSearchResult } from '../models/bookSearchResult';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  searchBooks(query: string, terms: string = ''): Observable<BookSearchResult> {
    if (!query.trim()) {
      return of({
        kind: '',
        items: [] as Book[]
      });
    }

    let options = {
      params: {
        q: this.normalizeQuery(query, terms),
        maxResults: '40'
      }
    };

    return this.http.get<BookSearchResult>(environment.apiUrl, options);
  }

  normalizeQuery(query: string, terms: string): string {
    if (terms.trim()) {
      query += `+${terms}`;
    }
    return query;
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
