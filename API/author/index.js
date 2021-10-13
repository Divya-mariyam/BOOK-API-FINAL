    
  const Router = require("express").Router() ; 
    
  const AuthorModel = require("../../database/author");  //relative paths 
    
/*
route               /author
description       get all authors
access           public
parameter        nil
methods          GET
*/

Router.get("/",async (req,res)=> {
    const getAllAuthors = await AuthorModel.find();
      return res.json({authors:getAllAuthors});
  });
  /*
  route               /author/book
  description       get all authors based on books
  access           public
  parameter         ISBN
  methods          GET
  */
  
  Router.get("/book/:isbn",(req ,res)=>{
      const getSpecificAuthor= database.author.filter((author)=> 
  author.books.includes(req.params.isbn)
  );
  if (getSpecificAuthor.length===0)
  {
      return res.json({
   error:`no author found for the book of ${req.params.isbn}`,
  });
  }
  return res.json({authors : getSpecificAuthor});
  });

  /*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
Router.post("/add", (req, res) => {
    const { newAuthor } = req.body;
AuthorModel.create(newAuthor);
    return res.json({ });
  });

  module.exports = Router ; 