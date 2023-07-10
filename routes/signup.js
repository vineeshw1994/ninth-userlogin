const express =require('express')
const router = express.Router()
const collection = require('../model/mongodb')


router.get('/signup',(req,res)=>{
    if(req.session.user){
        res.redirect('/home')
    } else if(req.session.admin){
        res.redirect('/admin')
    } else{
        res.render('signup')
    }
    //res.render('signup')
})

router.post('/signup',async(req,res)=>{
    const checkuser = await collection.findOne({$or:[{username:req.body.name},{email:req.body.email}]})
    //console.log(checkuser);
    if(!checkuser){
        const data ={
            username:req.body.username,   
            email:req.body.email,
            role:req.body.role,
            password:req.body.password
    
        }
        console.log(data);
        await collection.insertMany([data])

        if(req.body.role === 'user'){
            req.session.user = req.body.username
            res.render('home',{username:req.body.username})
        } else if(req.body.role === 'admin'){
            req.session.admin = req.body.username
            //const userDT = await collection.find({username:{$ne:req.session.admin}})
            //res.render('dashboard')

            res.render('login',{msg:'Login successful!'})
        }
    
    } else{
        res.render('signup',{message:'Username or Email already exists.'})
    }
   
})

module.exports = router;