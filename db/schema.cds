
namespace MyProject;

entity Students {
  key ID         : UUID;
  firstName      : String;
  lastName       : String;
  email          : String;
  age            : Integer;
}

entity Books{
  key ID      : UUID;
  borrowerID  : String;   
  bookTitle   : String;
  authorName  : String;
  readDate    : Date;
}
