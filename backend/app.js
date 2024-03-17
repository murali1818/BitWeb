const express=require('express');
const app=express();
const routes=require('./routes/product')
const auth=require('./routes/auth')
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(auth);
app.use(routes);
module.exports=app;