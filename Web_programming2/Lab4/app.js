const express = require('express');
const app = express();
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();
const dudeDat =  require("./data");


bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


const userList=[];

app.get("/api/people/history" , async( request, response) =>
{                                                  //api/people/history/test - instead of api/people/history because app.get uses the word history as a parameter and the program doesn't function as intended
// javascript is sequential and implimentation is always from top to bottom 
 
    let newlist=[];
    let count =0;
    let i = userList.length-1;

    if(userList.length > 20)
    {
        while(count<20)
        {
            let rez = await client.getAsync(userList[i].id);
            console.log(rez)
            newlist[count] = JSON.parse(rez);
            count++;
            i--;
        }
        response.json(newlist);
    }
    else
    {
        while(count<userList.length)
        {
            let rez = await client.getAsync(userList[i].id);
            console.log(rez)
            newlist[count] = JSON.parse(rez);
            count++;
            i--;
        }
    response.json(newlist);
    }
});

app.get("/api/people/:id", async( request, response) =>
{
        const ID =  parseInt(request.params.id,10); 
        const reszponze = await client.getAsync(ID);
        //let hello = await client.getAsync("hello");
        let flag = false;
    
    try{

        for(let i = 0 ; i< userList.length; i++)
        {
            let vari = await dudeDat.getElementByID(ID);  
            if(JSON.stringify(vari) === JSON.stringify(userList[i]))
            {
                flag = true;
                break;
            }
        }
    
    
        if (flag && reszponze)
        {
            const dude = await  dudeDat.getElementByID(ID);
            userList.push(dude);
            // console.log(userList)
            response.json(dude);
        }
        else
        {
            myVar = setTimeout(async function()
            { 
                const dude = await dudeDat.getElementByID(ID);
                const setResult = await client.setAsync(ID, JSON.stringify(dude));
                // console.log(ID)
                // console.log(await client.getAsync(ID))
                // console.log(setResult)
                //let setResult = await client.setAsync("goodnight", "moon");
                userList.push(dude);

                response.json(dude); }, 5000);
            
        
        }
    }
    catch(error)
    {
        response.status(500).json({ error: "Some Promise error" });
    }
    
    
}); 


app.use("*", function (request, response) {
    response.status(404).json({ error: "Route Not Found" });
});
 

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000  :~)= ");
});
  