//prefix : /book
//initializing express router

const Router = require("express").Router();
//database models

const BookModel = require("../../database/book");

/*
route               /
description       get all books
access           public
parameter         none
methods          GET
*/ 

Router.get("/" ,async (req,res)=>{ 
    const getAllBooks = await BookModel.find();
      return res.json(getAllBooks);
  
      });
      
/*
route               /is
description       get spcific book based on ISBN
access           public
parameter         ISBN
methods          GET
*/


    Router.get("/is/:isbn",async (req ,res)=> {

        const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn})
         // const getSpecificBook= database.books.filter(
         //   (book)=>  book.ISBN === req.params.isbn);
  
         //null ---> false
        //value ---> true
              if (!getSpecificBook )
              {
                  return res.json({
               error:`no book found for the ISBN of ${req.params.isbn}`,
                  });
              }
              return res.json({book : getSpecificBook});
          });
/*
route               /c
description       get spcific book based on category
access           public
parameter         category
methods          GET
*/

Router.get("/c/:category",async (req,res) =>{

    const getSpecificBook = await BookModel.findOne( {category: req.params.category,})
      //const getSpecificBook= database.books.filter((book)=> 
     // book.category.includes(req.params.category)
    //  );
      if (!getSpecificBook)
      {
          return res.json({
       error:`no book found for the category of ${req.params.category}`,
      });
      }
      return res.json({book : getSpecificBook});
      });
      

          /*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", async (req, res) => {

  try {
    const { newBook } = req.body;
  await BookModel.create(newBook);
     return res.json({ });


  } catch (error) {
    return res.json({error:error.message});
  }
  
  });


    /*
Route           /book/update/title
Description     Update book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {

    const updatedBook = await BookModel. findOneAndUpdate (
      {ISBN : req.params.isbn,
      },
      {
        title:req.body.bookTitle,
      },
      {
        new : true, //to get updated data
      });
        return res.json({ books: database.books });
      });
/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

Router.put("/update/author/:isbn/:authorId", async (req, res) => {
    // update book database
  
const updatedBook = await BookModel.findOneAndUpdate(
  {
  ISBN = req.params.isbn,
},
{
  $addToSet : {
authors:req.body.newAuthor,
  },
}, 
{
  new:true,
}
);

    //database.books.forEach((book) => {
      //if (book.ISBN === req.params.isbn) {
        //return book.author.push(parseInt(req.params.authorId));
      //}
    //});
  
    // update author database
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
    id:req.body.newAuthor,
  },
  {
    $addToSet:{
      books : req.params.isbn,
    },
  },
  {
    new:true
  },
  );

    //database.author.forEach((author) => {
      //if (author.id === parseInt(req.params.authorId))
        //return author.books.push(req.params.isbn);
    //});
  
    return res.json({
       books: updatedBook, 
      authors: updatedAuthor,
     });
  });

   /*
Route           /book/delete/author
Description    delete an  author from a book
Access          PUBLIC
Parameter       isbn , author id
Methods         DELETE
*/

Router.delete("/delete/author/:isbn/:authorId",async (req,res)=>{

    //update the book database
    const updatedBook = await BookModel.findOneAndUpdate ({
      ISBN:req.params.isbn,
    },
    {
      $pull:{
        authors : parseInt(req.params.authorId),
      },
    },
    {
      new: true
    });
    
    
    
    // database.books.forEach((book)=>{
    //   if(book.ISBN===req.params.isbn){
    //     const newAuthorList = book.author.filter(
    //       (authors)=>authors!==parseInt(req.params.authorId)
    //       );
    //       book.author = newAuthorList;
    //       return;
    //   }
    // });
    
    //update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
      id : parseInt(req.params.authorId)
    },
    {
      $pull:{
        books :req.params.isbn,
      },
    },
    {
      new:true
    });
    
    // database.author.forEach((authors)=>{
    // if(authors.id===parseInt(req.params.authorId)) {
    //   const newBooksList = authors.books.filter( 
    //   (book)=> book !==req.params.isbn
    //   );
    // authors.books = newBooksList;
    // return;
    // }
    // });
    
    return res.json({
      message:"author was deleted",
    book:updatedBook,
    authors:updatedAuthor,
    });
    });
 /*
Route           /book/delete
Description    delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/

Router.delete("/delete/:isbn",async (req,res)=>{
    const  updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});
    //replace the whole database   ----> filter
    
    // const updatedBookDatabase = database.books.filter((book)=>
    // book.ISBN !== req.params.isbn);
    
    // database.books = updatedBookDatabase;
    return res.json({books:database.books});
    
    //edit at single point directly to master database
    
    
    });

    
      module.exports = Router;