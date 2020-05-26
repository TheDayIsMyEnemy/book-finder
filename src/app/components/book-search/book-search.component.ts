import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { BookSearchResult } from './../../models/bookSearchResult';
import { Book } from '../../models/book';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  searchResult: BookSearchResult;
  faSearch = faSearch;
  
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.searchResult = {
      kind: undefined,
      items: Array<Book>()
    }
  }

  search(query: string): void {
    this.bookService
      .searchBooks(query)
      .subscribe((searchResult: BookSearchResult) => this.searchResult = searchResult);
  }
}
