const express =require('express')
const router = express.Router()
const collection = require('../model/mongodb')
const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

router.get('/admin/editUser',async (req,res)=>{
    if(req.session.admin){
        let id = req.query.id
        const list = await collection.findOne({_id: new ObjectId(id)})
        res.render('adminedit',{data:list})
        console.log(list);
    }
}) 

router.post('/adminedit',async (req,res)=>{
    await collection.updateOne({_id: new ObjectId(req.body.id)},{$set:{username:req.body.username, email:req.body.email, role:req.body.role, password:req.body.password}})
    res.redirect('/admin')
})

module.exports = router