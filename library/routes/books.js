const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');
const Book = require('../models/book');



router.get('/', async (req, res) => {
    try{
        const book = await Book.find().select('-__v');
        res.render("books/index", {
            title: "Книги",
            books: book,
        })
    } catch (e) {
        res.redirect('/404');
    };
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание записи",
        book: {},
    });
});

router.post('/create', fileMulter.single('fileBook'), 
    async (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        let fileBook = "";
        if(req.file){
            const {path} = req.file;
            fileBook = path;
        };
        
        const newBook = new Book({
                                    title, 
                                    description, 
                                    authors, 
                                    favorite, 
                                    fileCover, 
                                    fileName,
                                    fileBook
                                });
        try {
            await newBook.save();
            res.redirect('/api/books');
        } catch (e) {
            res.redirect('/404');
        };
    
});


router.get('/:id', async(req, res) => {
    const {id} = req.params;
    
    try{
        const book = await Book.findById(id).select('-__v');
        res.render("books/view", {
            title: "Информация о книге",
            book: book,
        });
    } catch (e) {
        res.redirect('/404');
    };
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const book = await Book.findById(id).select('-__v');
        res.render("books/update", {
            title: "Редактор информации",
            book: book,
        });
    } catch (e) {
        res.redirect('/404');
    }

});

router.post('/update/:id', fileMulter.single('fileBook'), async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params;

    try {
        let { fileBook } = await Book.findById(id);
        if(req.file){
            const {path} = req.file;
            fileBook = path;
        }
        await Book.findByIdAndUpdate(id, {
            title, 
            description, 
            authors, 
            favorite, 
            fileCover, 
            fileName,
            fileBook
        });
        res.redirect(`/api/books/${id}`);
    } catch (e) {
        res.redirect('/404');
    };

});

router.post('/delete/:id', async(req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
        res.redirect('/api/books/')
    } catch (e) {
        res.redirect('/404');
    }
});    

router.get('/:id/download', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id);
        res.download(book.fileBook); 
    } catch (e) {
        res.status(500).json(e);
    }

});

module.exports = router;