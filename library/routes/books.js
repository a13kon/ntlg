const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');
const Book = require('../models/book');

router.get('/', async (req, res) => {
    try{
        const book = await Book.find().select('-__v');
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    };
});

router.post('/', fileMulter.single('fileBook'), 
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
            res.json(newBook);
        } catch (e) {
            res.status(500).json(e);
        };
    
});


router.get('/:id', async(req, res) => {
    const {id} = req.params;
    
    try{
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (e) {
        res.status(500).json(e);
    };
});

router.put('/:id', fileMulter.single('fileBook'), async (req, res) => {
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
        res.status(500).json(e)
    };

});

router.delete('/:id', async(req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
        res.redirect('/api/books/')
    } catch (e) {
        res.status(500).json(e);
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