const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException',err =>{
    console.log('UNCAUGHT EXCEPTION ERR, Shuting down....');
    console.log(err.name,err.message);
    server.close(()=>{
        process.exit(1);
    });
});

dotenv.config({path: './config.env'});
const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con =>
    console.log('DB connection successful!'));

// const app = require('./app');
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
