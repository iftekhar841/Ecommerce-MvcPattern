const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ECOM-MVC');


const user_routes = require('./routes/userRoute');

app.use('/api',user_routes);

app.listen(3000, function(){
    console.log('Server is running on the port no:3000');
});