db.books.insertMany(
    [{  "title": "string",
        "description": "string"
        "authors": "string"},
    {  "title": "string",
        "description": "string"
        "authors": "string"}]
)

db.books.find({title: "string"})

db.books.updateOne(
    {_id: "id"},
    {$set: {description: "descr", authors: "author"}}
)