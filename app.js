const express= require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const path= require('path');

const app=express();

mongoose.connect('mongodb+srv://test:test@cluster0.44aksf2.mongodb.net/picShare?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');

const indexRoute= require('./routes/index');
const uploadRoute= require('./routes/upload');

app.use('/',indexRoute);
app.use('/upload',uploadRoute);

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});