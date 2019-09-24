const express = require("express");
const router = express.Router();
const taskData = require("../data/tasks");



router.get("/api/tasks/:id", async (req, res) => 
{    //to get  by id 
  try 
  {
    const recipie123 = await taskData.getTaskById(req.params.id);   
    res.json(recipie123);
  } 
  catch (e) 
  {
    console.log(e); //for debugging purposes. 
    res.status(404).json({ error : `${e} has occurred` });  
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/api/tasks", async (req, res) => 
{    // to get all tasks
  try 
  {
    
    const taskList = await taskData.getAllTasks();
    

    if(req.query.skip)
    {
        let a = req.query.skip;
        let a1 = [];
        for (let i = a, j = 0; i< taskList.length; i++, j++)
        {
            a1[j] = taskList[i]
        }
        res.json(a1);  
    }
    else if(req.query.take)
    {
        let a = req.query.take;
        if(a < 100)
        {
            
            
            let a1 = [];
            for (let i = 0; i< a; i++)
            {
                if(taskList[i] != null)
                {
                a1[i] = taskList[i];
                }
            }
            res.json(a1); 
        }
        else
        {
        
          
            let a1 = [];
            for (let i = 0; i< 100; i++)
            {
                if(taskList[i] != null)
                {
                a1[i] = taskList[i];
                }
            }
            res.json(a1); 
        }

    }
    else
    {
      
        let a1 = [];
            for (let i = 0; i< 20; i++)
            {
                if(taskList[i] != null)
                {
                a1[i] = taskList[i];
                }
            }
            res.json(a1); 
    }
}    
   catch (e) 
  {
    // Something went wrong with the server!
   
    res.status(500).json({ error: `${e} has occuurred` });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/api/tasks", async (req, res) => 
{     //to post a new task
    
    const newTask = req.body;   

   

    try{
        const {title, description, hoursEstimated} = newTask;  
       
        const newData = await taskData.addTask(title, description, hoursEstimated);
        res.json(newData); 

    }
    catch(e)
    {
        res.status(500).json({ error: `${e} has occuurred` });   
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put("/api/tasks/:id", async (req, res) => {     

    const changeTask = req.body; 

    try
    {
        await taskData.getTaskById(req.params.id);  
    }
    catch(e)
    {
       
        res.status(404).json({ error: "Task not found" });  
        return;
    }

    try
    {
        let updTask = await taskData.changetask(req.params.id, changeTask);  
        res.json(await taskData.getTaskById(req.params.id));
    }
    catch(e)
    {
        
        res.status(500).json({ error: `${e} has occuurred` });
        return;
    }

});

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.patch("/api/tasks/:id", async (req, res) => {   

    const modifyTask = req.body;

    try{
        await taskData.getTaskById(req.params.id);
    }
    catch(e)
    {
        res.status(404).json({ error: "Recipie not found" });
        return;  
    }

    try{
        let updTask = await taskData.modifyTask(req.params.id, modifyTask); 
        res.json(updTask);
    }
    catch(e)
    {
         
        res.status(500).json({ error: `${e} has occuurred` });
        return;
    }

} );


// //////////////////////////////////////////////////////




router.post("/api/tasks/:id/comments", async (req, res) => 
{     //to post a new task
    
    const newTask = req.body;   

 

    try{
        const {name, comment} = newTask;  
       
        const newData = await taskData.addComm(req.params.id, name, comment);
        res.json(newData); 

    }
    catch(e)
    {
        res.status(500).json({ error: `${e} has occuurred` });   
    }

});


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.delete("/api/tasks/:id/:commentId", async (req,res) =>{   //to delete a recipie by id 

    try{
        let a = await taskData.removeCommentsByID(req.params.id,req.params.commentId);  //deletes recipie based on the given id
        res.json(a); //comment this out if you dont want any response.. 
    }
    catch(e)
    {
         
        res.status(500).json({ error: `${e} has occuurred` });
        return;
    }

});

module.exports = router;