const mongoCollections = require("../config/mongoCollections",{ useNewUrlParser: true });
const tasks = mongoCollections.SB;
const uuidv4 = require("uuid/v4");


let exportMethods = {

async  getTaskById(id)          



{
    if(!id || typeof id != "string")   // if the id is provided or the type of id is of type string
    {
        throw "ID missing or improper id input";
    }


    let taskByID = await tasks();
    let task = await taskByID.findOne({ _id: id });    //looks for a recipie in the database and stores in recipie

    if(!task)   //if the recipie has not been found
    {
        throw "task not found!! ";
    }

    return task;

},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async  getAllTasks()
{   

    let TaskColl = await tasks();
    let CollectionTasks = await TaskColl.find({}).toArray(); 

    let FilterRecipies = [];  
    let i = 0;   


    while(i<CollectionTasks.length) 
    { 
        let newSTUFF = {
            _id: CollectionTasks[i]._id,     
            title: CollectionTasks[i].title,                     
            description: CollectionTasks[i].description,           
            hoursEstimated: CollectionTasks[i].hoursEstimated,                        
            completed : CollectionTasks[i].completed,
            comments :CollectionTasks[i].comments
         
        }
        FilterRecipies[i]=newSTUFF;  
        
        i++;
          
    }

    return FilterRecipies;   
},


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async addTask(title, description, hoursEstimated)
{

    let comments;

    if(!title) 
    {
        throw " You MUST provide a title";   
    }

    if(!description)  
    {
        throw " You must provide description";
    }

    if(!hoursEstimated)    
    {
        throw " You horus estimated";
    }

    if(typeof title !== 'string')   
     {
         throw " The title must be of type STRING";
     }

     if(isNaN(hoursEstimated))   
     {
         throw " The hoursEstimated must be of type Number";
     }

     if(comments)   
     {
         throw " Cannot Add comments here";
     }
     


    let thisTask =  await tasks();

    const newITEM = 
    {
        _id: uuidv4(),                      
        title: title,                       
        description: description,           
        hoursEstimated: hoursEstimated,                        
        completed : false,
        comments :[]
     
    

    };


     const newInsertInformation = await thisTask.insertOne(newITEM); 

    let aValue = newInsertInformation.insertedId;
    
    return await this.getTaskById(aValue);  

},

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async  changetask(id, newTask)

{
    if(!id)
    {
        throw " You must provide an id";  

    }

    if(!newTask.title)            
    {
        throw " You must provide a title"
    }

    if(!newTask.description)            
    {
        throw " You must provide a description "
    }

    if(!newTask.hoursEstimated)            
    {
        throw " You must provide a hours estimated"
    }

    if(newTask.comments)            
    {
        throw " You cannot comment here"
    }

    if(typeof newTask.title !== 'string')   
    {
        throw " The title must be of type STRING";
    }

    if(typeof id !== 'string')   
    {
        throw " The id must be of type STRING";
    }

    if(typeof newTask.description !== 'string')   
    {
        throw " The description must be of type STRING";
    }

    if(isNaN(newTask.hoursEstimated))   
    {
        throw " The hoursEstimated must be of type Number";
    }

    if(typeof newTask.completed !== 'boolean')   
    {
        throw " The completed must be of type boolean";
    }

    

    const thisTask = await tasks();
    await thisTask .updateOne({ _id: id },{$set: newTask});
    const newLocal = await this.getTaskById(id);  
    return newLocal;  
    
},

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async  modifyTask(id, updatedTask)
{
    if(!id)   
    {
        throw " You must provide an id";

    }

    if(typeof id !== 'string')   
    {
        throw " The id must be of type STRING";
    }

    if(updatedTask.title)
    {
        if(typeof updatedTask.title !== 'string')   
        {
            throw " The title must be of type STRING";
        }

    }
    if(updatedTask)

    if(updatedTask.description)
    {
        if(typeof updatedTask.description !== 'string')   
        {
            throw " The description must be of type STRING";
        }

    }

    if(updatedTask.hoursEstimated)
    {
        if(isNaN(updatedTask.hoursEstimated))   
        {
            throw " The hoursEstimated must be of type Number";
        }
    }

    if(updatedTask.completed)
    {
        if(typeof updatedTask.completed !== 'boolean')   
    {
        throw " The completed must be of type boolean";
    }
    }

    if(updatedTask.comments)            
    {
        throw " You cannot comment here"
    }




  
    const thisTask = await tasks();
    await thisTask.updateOne({ _id: id },{$set: updatedTask});
    return await this.getTaskById(id);  

},

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async addComm ( id, name, comment)
{
  

    if(!id) 
    {
        throw " You MUST provide a ID";   
    }
    

    if(!name)  
    {
        throw " You must provide name";
    }

    if(!comment)    
    {
        throw " You comment";
    }

    if(typeof id !== 'string')   
     {
         throw " The id must be of type STRING";
     }

     if(typeof name !== 'string')   
     {
         throw " The name must be of type STRING";
     }

     if(typeof comment !== 'string')   
     {
         throw " The comment must be of type STRING";
     }


    let thisTask =  await tasks();

    let a = await this.getTaskById(id);

     
     const newITEM = 
     {
         _id: uuidv4(),                      
        name: name,                       
        comments : comment
     
     };

    
     a.comments.push(newITEM);
    
     

    
    await thisTask.updateOne({ _id: id },{$set: a});
    return await this.getTaskById(id);  

},


async removeCommentsByID(id,commid)
{
    let a = await this.getTaskById(id)

    let b = [];
    b = a.comments;

    for (let i=0; i< b.length; i++)
    {
       if (b[i]._id == commid)
       {
         b.splice(i,1);
       }
             
    }
    a.comments = b;

    
    const thisTask = await tasks();
    await thisTask.updateOne({ _id: id },{$set: a});
    return await this.getTaskById(id);  


 
}

}

module.exports = exportMethods; 

