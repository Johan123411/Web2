const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.SB;
const uuidv4 = require("uuid/v4");


let exportMethods = {

async  getTaskById(id: string)          



{
    if(!id || typeof id != "string")   // if the id is provided or the type of id is of type string
    {
        throw "ID missing or improper id input";
    }


    let taskByID:any = await tasks();
    let task :any= await taskByID.findOne({ _id: id });    //looks for a recipie in the database and stores in recipie

    if(!task)   //if the recipie has not been found
    {
        throw "task not found!! ";
    }

    return task;

},
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async  getAllTasks()
{   

    let TaskColl: any= await tasks();
    let CollectionTasks:any = await TaskColl.find({}).toArray(); 

    let FilterRecipies:any = [];  
    let i = 0;   


    while(i<CollectionTasks.length) 
    { 
        let newSTUFF: object = {
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

async addTask(title: string, description: string, hoursEstimated: number)
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

    const newITEM : object= 
    {
        _id: uuidv4(),                      
        title: title,                       
        description: description,           
        hoursEstimated: hoursEstimated,                        
        completed : false,
        comments :[]
     
    

    };


     const newInsertInformation = await thisTask.insertOne(newITEM); 

    let aValue:any = newInsertInformation.insertedId;
    
    return await this.getTaskById(aValue);  

},

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async  changetask(id: string, newTask: { title: string; description: string; hoursEstimated: number; comments: string; completed: boolean; })

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

    

    const thisTask:any = await tasks();
    await thisTask .updateOne({ _id: id },{$set: newTask});
    const newLocal :any= await this.getTaskById(id);  

    return newLocal;  
    
},

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async  modifyTask(id: string, updatedTask: { title: string; description: string; hoursEstimated: number; completed: boolean; comments: string; })
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




  
    const thisTask :any= await tasks();
    await thisTask.updateOne({ _id: id },{$set: updatedTask});
    return await this.getTaskById(id);  

},

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



async addComm ( id: string, name: string, comment: string)
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


    let thisTask:any =  await tasks();

    let a :any= await this.getTaskById(id);

     
     const newITEM:Object = 
     {
         _id: uuidv4(),                      
        name: name,                       
        comments : comment
     
     };

    
     a.comments.push(newITEM);
    
     

    
    await thisTask.updateOne({ _id: id },{$set: a});
    return await this.getTaskById(id);  

},


async removeCommentsByID(id: string,commid: string)
{
    let a:any = await this.getTaskById(id)

    let b:any = [];
    b = a.comments;

    for (let i=0; i< b.length; i++)
    {
       if (b[i]._id == commid)
       {
         b.splice(i,1);
       }
             
    }
    a.comments = b;

    
    const thisTask :any= await tasks();
    await thisTask.updateOne({ _id: id },{$set: a});
    return await this.getTaskById(id);  


 
}

}

export default exportMethods; 

