

const Router = require("express").Router();



/*
route               /publication
description       get all publications
access           public
parameter         nil
methods          GET
*/
Router.get("/",(req,res)=> {
    return res.json ({publications:database.publication});
    });
    
   /*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

Router.put("/update/book/:isbn",(req,res)=>
{

    //update pubication database
    database.publications.forEach((publication)=>{
if(publication.id===req.body.pubId){
   return publication.books.push(req.params.isbn);
}
    });
//update the book database
database.books.forEach((book)=>{
if(book.ISBN===req.params.isbn){
    book.publication=req.body.pubId;
    return;
}
}); 
return res.json({
    books:database.books,
    publications:databse.publications,
    message:"successfully updated publication",
});

});

/*
Route           /publication/delete/book
Description    delete a book from publication
Access          PUBLIC
Parameter       isbn , publication id
Methods         DELETE
*/

Router.delete("/delete/book/:isbn/:pubId",(req,res)=>
{
//update publication database
database.publication.forEach((publications)=>{
  if(publications.id === parseInt(req.params.pubId))
  {
    const newBooksList = publications.books.filter(
      (book)=> book !== req.params.isbn
    );

publications.books = newBooksList;
return; 

  }
});
//update book database

database.books.forEach((book)=>{
  if(book.ISBN === req.params.isbn)
  {
book.publications = 0;  //no publication available
return;
  }
});

return res.json({
  books:database.books,
  publications:  database.pubications,
}); 
});


module.exports= Router;