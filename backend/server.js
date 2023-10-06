require('dotenv').config();
const express = require('express');

//console.log(db.createUser("jeebs","wdwadwiiiiiii@adadgmail.com","asdasd"));
//console.log(db.createHobby(1,"hobbyName",0,JSON.stringify("Wedesneday 10-5"),"big boy"));
const app = express();

app.use(express.json());
const entriesRouter = require('./router/entries.js');
app.listen(process.env.PORT, () => {
    console.log("test working",process.env.PORT);
});    

app.use((req,res,next) => { 
    console.log(req.path, req.method);
    next();
});

app.use('/api/entries',entriesRouter)