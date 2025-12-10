using MyProject as my from '../db/schema';

service CatalogService {
  entity Books as projection on my.Books;
  entity Products as projection on my.PRODUCTS;

  
  action LogBooks(
    borrowerID : String(50),
    bookTitle  : String(100),
    authorName : String(100),
    readDate   : Date
  ) returns String;
  
  action FetchBooks(borrowerID : String(50)) returns array of Books;
  
  action insertTBProducts() returns String;
  action insertTBSuppliers() returns String;
  action insertTBCategories() returns String;
  
  function fetchData() returns array of {
    ProductID     : Integer;
    ProductName   : String;
    SupplierID    : Integer;
    CompanyName   : String;
    Address       : String;
    City          : String;
    Region        : String;
    CategoryName  : String;
    Description   : String;
  };
}