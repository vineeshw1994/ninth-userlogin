const express =require('express')
const router = express.Router()


router.get('/home',(req,res)=>{
  if(req.session.user){
    res.render('home',{username:req.body.username})
  } else{
    res.redirect('/login')
  }
})

module.exports = router;