namespace MyProject;
 

entity Books {
  key ID         : UUID;
  borrowerID     : String(50);     // <-- change from borrowerName to borrowerID
  bookTitle      : String(100);
  authorName     : String(100);
  readDate       : Date;
}

 
entity Products {
    key ProductID : UUID; // Primary Key
    ProductName : String(100); // Name of the product
    SupplierID : UUID; // Identifier for the supplier
    CategoryID : UUID; // Identifier for the category
    QuantityPerUnit : String(100); // Quantity per unit of the product
    UnitPrice : String(100); // Price per unit
    UnitsInStock : Integer; // Number of units currently in stock
    UnitsOnOrder : Integer; // Number of units currently on order
    ReorderLevel : Integer; // Level at which reordering is triggered
    Discontinued : String(100); // Indicates if the product is discontinued
}
 
entity Suppliers {
    SupplierID    : UUID; //identifier for the supplier
    CompanyName   : String(100); // Name of the supplier company
    ContactName   : String(100); // Name of the contact person
    ContactTitle  : String(100); // Title of the contact person
    Address       : String(100); // Street address of the supplier
    City          : String(100); // City of the supplier
    Region        : String(100); // Region of the supplier
    PostalCode    : String(100); // Postal code of the supplier
    Country       : String(100); // Country of the supplier
    Phone         : String(100); // Phone number of the supplier
    Fax           : Integer; // Fax number of the supplier
    HomePage      : String(200); // Website of the supplier
}
 
entity Categories {
    CategoryID    : UUID; // Identifier for the category
    CategoryName  : String(100); // Name of the category
    Description   : String(255); // Description of the category
}