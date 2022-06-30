const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const Todo = require('./model/Todo')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// create application/x-www-form-urlencoded parser
app.use((req,res,next)=>{
  //for removing CORS error for having different ports
  res.setHeader('Access-Control-Allow-Origin','*')
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,PATCH,DELETE')
  res.setHeader('Access-Control-Allow-Headers','Content-type, Authorization')
  next()
}) 

app.get('/getTodos',(req,res,next)=>{
    Todo.find()
    .then(items=>{
      res.status(200).json({todos:items})
    })
    .catch(e=>res.status(400).send(e))
})
app.post('/addTodo',(req,res,next)=>{
    const item = req.body.item;
    const todo = new Todo({
      name:item
    })
    todo.save()
    .then(result=>{
      res.status(200).json({message:'Todo Item Added'})
    })
    .catch(e=>res.status(400).send(e))
}) 
app.post('/editTodo',(req,res,next)=>{
  const id = req.body.id
  const newName = req.body.newText
  Todo.findById(id)
  .then(item=>{
    item.name = newName
    return item.save()
  })
  .then(result=>{
    res.status(200).json({message:'Todo Item Edited'})
  })
  .catch(e=>res.status(400).send(e))
}) 

app.post('/deleteTodo',(req,res,next)=>{
  const id = req.body.id;
  Todo.findByIdAndRemove(id)
  .then(result=>{
    res.status(200).json({message:'Todo Item Deleted'})
  })
  .catch(e=>res.status(400).send(e))
}) 


mongoose.connect(`mongodb+srv://bhautik:iKVxMr1hfuEz6StK@cluster0.l0p55.mongodb.net/todo?retryWrites=true&w=majority`)
.then(result=>{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 
}).catch(err=>console.log(err))  

