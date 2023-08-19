const express = require('express');
const db = require("../database.js");
const router = express.Router();

/*router.get('/:id',(req,res) => {
    res.json({mssg:'Get all entries!'});
});*/

router.get('/login',async (req,res) => {//Get user / Login
    const {email,password} = req.body;
    try{
        const result = await db.getUser(email,password);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({error: error.message})
    }
});

router.post('/newUser',async (req,res) => {//Make USER
    const {username,email,password} = req.body;
    try{
        const result = await db.createUser(username,email,password);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({err: err.message})
    }
});

router.post('/newHobby',async (req,res) => {//Make HOBBY
    const {id,title,streak,schedule,catergory} = req.body;
    try{
        const result = await db.createHobby(id,title,streak,schedule,catergory);
        res.status(200).send(result);
    } catch(err){
        res.status(400).json({err: err.message})
    }
});

router.delete('/deleteHobby/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const result = await db.deleteHobby(id);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({err: err.message})
    }
});

router.patch('/updateHobby/:id',async (req,res) => {
    const {id} = req.params;
    const {title,streak,schedule,catergory} = req.body;
    try{
        const result = await db.updateHobby(id,title,streak,schedule,catergory);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({err: err.message})
    }
})

router.get('/getHobbies/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const [result] = await db.getHobbies(id);
        res.status(200).json(result);
    } catch(err){
        res.status(400).json({err: err.message})
    }
})

module.exports = router;