import Task from"../models/taskModel.js";

export const createTask=async(req,res)=>{

  try{

    const task=await Task.create({
      title:req.body.title,
      description:req.body.description,
      status:req.body.status,
      createdBy:req.user.id
    });

    res.json(task);

  }catch(err){
    res.status(500).json({msg:err.message});
  }
};

export const getTasks=async(req,res)=>{
  try{
    const tasks=await Task.find({
        createdBy:req.user.id
    });

    res.json(tasks);

  }catch(err){
    res.status(500).json({
        msg:err.message
    });
  }
};

export const updateTask=async(req,res)=>{
  try{
    const updated=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updated);
  }catch(err){
    res.status(500).json({
        msg:err.message
    });
  }
};

export const deleteTask=async(req,res)=>{
  try{
    await Task.findByIdAndDelete(req.params.id);
    res.json({
        msg:"Task deleted"
    });
  }catch(err){
    res.status(500).json({msg:err.message});
  }
};