const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./../modules/products');

const router = express.Router();


dotenv.config({path: './config.env'});
const app = require('./../app');
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con =>
    console.log('DB connection successful!'));

// const data = {
//     'name':'Home Page',
//     'author': 'Rahul Tiwari'
// }
const data = ['array','arrv','arr3'];

router.get('/',cors(),(req,res,next)=>{
    res.status(200).json({
        status: 'success',
        message: 'home route /'
    });
    next();
});

router.post('/sendData',cors(),(req,res,next)=>{
    const itemsProduct = new Product({
        item : req.body.item,
    })
    itemsProduct.save().then(()=>{
        console.log(`Data saved form frontEnd i.e., ${itemsProduct}`);
    });
    const formValue = req.body.item;
    data.push(formValue);
    res.send(data);
    next();
});

router.delete('/remove/:id',cors(),(req,res,next)=>{
    const resultID = req.params.id;
    const data = data.map(item=>{
        if(item!= resultID){
            return item;
        }
    });
    console.log(`***********req.params**************`);
    console.log(resultID);
    console.log(`***********req.params**************`);
    res.send(data);
    next();
});

router.get('/home',cors(),(req,res,next)=>{
    // res.sendFile(path.join(__dirname + './../index.html'));
    res.render('home',{
        status: 'success',
        title: 'Home',
        data,
    });
    next();
});
router.get('/about',cors(),(req,res,next)=>{
    res.render('about',{
        status: 'success',
        title: 'About'
    });
    next();
});



module.exports = router;