
// srv/service.cds
using MyProject as my from '../db/schema';

service CatalogService {
  entity Books as projection on my.Books;

  action LogBooks(
    borrowerID : String(50),
    bookTitle  : String(100),
    authorName : String(100),
    readDate   : Date
  ) returns String;

  action FetchBooks(borrowerID : String(50)) returns array of Books;
}
