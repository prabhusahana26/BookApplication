const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const Book = require('./models/Book')
c
const app = express()
const port = 5000


mongoose.connect('mongodb://localhost:27017/book',{
    useNewUrlParser: true,
    useUnifiedTopology : true
})


const db = mongoose.connection
db.on('error', console.error.bind(console,"Connection issue" ))

db.once('open',()=>{
    console.log("MongoDB Connected")
})


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended:true}))


app.get('/', async (req,res)=> {

    const books = await Book.find()

    res.render('index', {books})
    
})

app.use('/add', async (req, res)=>{
  
    const {title, version, year, author} = req.body

    const book = new Book({title, version, year, author})

    await book.save()

    res.redirect('/')

})

app.listen( port , () => console.log(`Server is running on Port No : ${port}`))
