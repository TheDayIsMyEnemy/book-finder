import { Book } from './book';

export interface BookSearchResult {
    kind: string;
    items: Book[];
}