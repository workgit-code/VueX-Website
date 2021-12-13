const mongoose = require('mongoose')
require('dotenv').config({ path: './.env' });

mongoose.connect(process.env.MONGODB_URI,  
    {useNewUrlParser: true, useUnifiedTopology: true,}).then(() => {
        console.log("DB Connected");
    })
    .catch((err) => console.log(err))