const express =require('express')
const collection = require('../model/mongodb')
const router = express.Router()

router.get('/admin-adduser',(req,res)=>{
    res.render('adduser')
}) 

router.post('/admin-adduser',async(req,res)=>{
    const checkuser = await collection.findOne({$or:[{username:req.body.name},{email:req.body.email}]})
    console.log(checkuser);
    if(!checkuser){
        const userDetials = {
            username :req.body.username,
            email : req.body.email,
            role: req.body.role,
            password:req.body.password
        }
        await collection.insertMany([userDetials])
        res.redirect('/admin')
    }else{
        res.render('adduser', {message:'user already exists.'})
    }
})

module.exports =router