
// srv/service.cds
using MyProject from '../db/schema';

service CatalogService {
  entity Students as projection on MyProject.Students;
  entity Books as projection on MyProject.Books;

  // ADDED: Optional view to alias borrowerID -> borrowerName for display parity in HANA Explorer
  entity BooksView as projection on MyProject.Books {
    ID,
    borrowerID as borrowerName, // CHANGED (alias): for display only
    bookTitle,
    authorName,
    readDate
  };

  action LogBooks(
    borrowerID : String,
    bookTitle  : String,
    authorName : String,
    readDate   : Date
  ) returns String;

  action FetchBooks(
    borrowerID : String
  ) returns array of Books;
}
