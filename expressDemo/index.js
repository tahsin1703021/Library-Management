const cors = require('cors');
const mongoose = require('mongoose')
const express = require('express');
const dotenv = require("dotenv");

const userRouter = require('./routes/userRoute');
const bookRouter = require('./routes/bookRoute');
//returns an object
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(require('body-parser').urlencoded({extended: true}));
mongoose
    .connect('mongodb://localhost/libraryDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err))

app.use('/user', userRouter);
app.use('/books',bookRouter);
// app.use('/admin',adminRouter)


app.listen(3000, () => console.log(`listening to the port 3000`));