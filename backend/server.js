require('dotenv').config();
const cors = require('cors') 
const express = require('express');

const app = express();
app.use(express.json());
const entriesRouter = require('./router/entries.js');
app.listen(process.env.PORT, () => {
    console.log("test working",process.env.PORT);
});    

app.use(cors({methods: 'GET,POST,PATCH,DELETE,OPTIONS',origin: '*'})) 

app.use((req,res,next) => { 
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Accept, Content-Type");
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, TRACE, OPTIONS, PATCH");
    next();
});

app.use('/api/entries',entriesRouter)

