const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/route');
const dotenv = require('dotenv');
const ejsLint = require('ejs-lint')

dotenv.config({path: './config.env'});

const cors = require('cors');

const app = express();

// app.use(cors({
//     'origin' : '*',
//     'methods' : ['GET', 'PATCH', 'POST', 'DELETE'],
//     'allowedHeaders' : ['Content-Type', 'Authorization'],
//     'exposedHeaders' : ['Content-Range', 'X-Content-Range'],
//     'credentials' : true ,
//     'optionsSuccessStatus' : 204

// }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",  "*"),
    res.setHeader("Access-Control-Allow-Methods","GET, PATCH, POST, DELETE"),
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization"),
    res.setHeader("Access-Control-Allow-Credencials", true);
    next();
});

app.use(express.json());

app.use(express.static('public'));

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));


app.use('/',router);


// app.listen(port,()=>{
//     console.log(`Server is running at port : ${port} ....!`)
// });
const port = process.env.PORT || 5000;
const server = app.listen(port,()=>{
    console.log(`Server is listning at port ${port}........`);
});

// DeprecationWarnning due to old version
process.on('unhandledRejection',err => {
    console.log('UNHANDLE REJECTION, Shuting down......');
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
});

module.exports = app;