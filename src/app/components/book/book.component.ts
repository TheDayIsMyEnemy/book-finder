import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  constructor() { }

  ngOnInit(): void {
  }

  
  normalizeBookTitle(title: string, subtitle: string) {
    if (subtitle) {
      title += `: ${subtitle}`;
    }
    return title;
  }

  normalizeBookDescription(description: string) {
    const maxDescriptionLength = 220;

    if (description.length > maxDescriptionLength) {
      const sentences = description.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
      description = '';

      for (let s of sentences) {
        if (description.length + s.length > maxDescriptionLength) {
          break;
        }
        description += s;
      }
    }
    return description;
  }
}
