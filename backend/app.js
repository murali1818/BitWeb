const express=require('express');
const app=express();
const routes=require('./routes/routes')
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(routes);
module.exports=app;