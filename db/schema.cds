namespace MyProject;

entity Books {
    Key ID: UUID; //Book ID
    borrowerName: String(50); //Borrower's ID
    bookTitle: String(100); //Book Title
    authorName: String(100); //Author Name
    readDate: Date; //Date
 
};
 
entity PRODUCTS{
    Key ProductID: UUID; //Product ID
    ProductName: String(100); //Product name
    SupplierID: String(100);    //Supplier ID
    CategoryID: String(100);    //Category ID
    QuantityPerUnit: String(100);  //Quantity per Unit
    UnitPrice: String(100); //Unit Price
    UnitsInStock: Integer;  //Units in Price
    UnitsOnOrder: Integer; //Units on Order
    ReorderLevel: Integer; //Reorder Level
    Discontinued: String(100); //Discontinued
 
}
 
entity SUPPLIERS{
    SupplierID: UUID; //Supplier ID
    CompanyName: String(100); //Company Name
    ContactName: String(100); //Contact Name
    ContactTitle: String(100); //Contact Title
    Address: String(100); //Address
    City: String(100); //City
    Region : String(100);
    PostalCode : String(100);  
    Country : String(100); 
    Phone : String(100);    
    Fax : String;  
    HomePage : String(200); 
 
}
 
entity CATEGORIES {
    CategoryID: String; 
    CategoryName: String; 
    Description: String; 
}