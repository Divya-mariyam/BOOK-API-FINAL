let books = [
    {
ISBN:"book123",
title:"meulha",
pubDate:"2021-03-03",
language:"en",
author:[1,2],
numPage:200,
category:["journal","story","fiction"],
publications:[1],
},
];



const author = [
    {
id:1,
name:"amish",
books:["book123"],
} ,
   {
    id:2,
    name:"elon musk",
    books:["book123"],
},
];




const publication = [
    {
id:1,
name:"DC Books ",
books:["book123"],
},
{
    id:2,
    name:"vanitha",
    books:[],
    },
];

module.exports={books,author,publication};