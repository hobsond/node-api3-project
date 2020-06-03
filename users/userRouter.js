const express = require('express');
const userDb = require('./userDb')

const router = express.Router();


router.get('/', (req, res) => {
  // do your magic!
  res.send('connected user Api')
});

router.post('/',validateUser, (req, res) => {
  // userDb.insert(req.body)
  
  userDb.insert(req.body)
  .then(d=>{
    res.status(200).json(d)
  })
  .catch(err=>res.status(400).json({error:'could not add user'}))
  // do your magic!


});

router.post('/:id/posts',validateUserId , (req, res) => {
  // do your magic!
    userDb.getUserPosts(req.params.id)
    .then( item =>{
      if(item){
        res.status(200).json(item)
      }
      else{
        res.status(400).json({error:'could not find user post '})
      }
    })
    .catch(err=>res.status(500).json({error:'can not find post'}))


});



router.get('/:id', validateUserId, (req, res) => {
  userDb.getById(req.params.id)
  .then(item=>{
    if(item){
      res.status(200).json(item)
    }else{
      res.status(401).json({error:'can not find user at this id '})
    }
  })
  .catch(err=>res.status(400).json({error:'can not find user'}))
  // do your magic!
});

router.get('/:id/posts', validateUserId,(req, res) => {
  userDb.getUserPosts(req.param.id)
  .then(item=>{
    if(item){
      res.status(200).json(item)
    }else{
      res.status(401).json({error:'can not find user at this id '})
    }
  })
  .catch(err=>res.status(400).json({error:'can not find user'}))
  // do your magic!

});

router.delete('/:id',validateUserId, (req, res) => {
  userDb.remove(req.params.id)
  .then(item=>{
    if(item){
      res.status(200).json(item)
    }else{
      res.status(401).json({error:'can not find user at this id '})
    }
  })
  .catch(err=>res.status(400).json({error:'can not find user'}))
  // do your magic!
});

router.put('/:id',validateUserId, (req, res) => {
  // do your magic!

  
  userDb.update(req.body)
  .then(d=>{
    res.status(200).json(d)
  })
  .catch(err=>res.status(400).json({error:'could not add user'}))
  // do your magic!


});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id
  userDb.getById(id)
  .then(item=>{
    if(item){
      req.user = item

      next()
    }
    else{
      res.status(400).json({error:'cant find id'})

    }
  })
  .catch(err=>{
    res.status(500).json({error:'server error '})

  })
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req.body)
  if(req.body){

  
    if(req.body.name){
      
      next()


    }else{
      res.status(400).json({error:'insert a name '})
    }
  }else{
    res.status(400).json({error:'error message'})
  }

  
}

function validatePost(req, res, next) {
  if(req.body){

  
    if(req.body.text){
      
      next()


    }else{
      res.status(400).json({error:'insert a post '})
    }
  }else{
    res.status(400).json({error:'error message'})
  }
  // do your magic!
}

module.exports = router;
