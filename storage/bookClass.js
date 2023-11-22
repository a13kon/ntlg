const { v4: uuid} = require('uuid');

class Book {
    constructor(
        title = "", 
        desc = "", 
        authors = "", 
        favorite = "", 
        fileCover = "", 
        fileName = "",
        fileBook = "",
        id = uuid()) {
            this.id = id;
            this.title = title;
            this.desc = desc;
            this.authors = authors;
            this.favorite = favorite;
            this.fileCover = fileCover;
            this.fileName = fileName;
            this.fileBook = fileBook;
    };
};

exports.Book = Book;