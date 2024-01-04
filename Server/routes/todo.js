const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");


router.get("/api/todo", async (req, res)=> {
    try{
        const allTodoItems = await Todo.find({});
        res.status(200).json(allTodoItems)
      }catch(err){
        res.json(err);
      }
});


router.post("/api/todo", async (req, res)=>{
    try{
      const newItem = new Todo({
        description: req.body.description
      })
      //save this item in database
      const saveItem = await newItem.save()
      res.status(200).json(saveItem);
    }catch(err){
      res.json(err);
    }
  });


router.put("/api/todo/:id", async (req, res)=>{
    try{
      //find the item by its id and update it
      const updateItem = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json(updateItem);
    }catch(err){
      res.json(err);
    }
  });


router.delete("/api/todo/:id", async (req, res)=>{
    try{
      //find the item by its id and delete it
      const deleteItem = await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json('Item Deleted');
    }catch(err){
      res.json(err);
    }
  });

module.exports = router;