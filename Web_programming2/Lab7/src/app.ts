import express = require('express');
import { Request, Response, NextFunction } from 'express';
import bodyParser = require('body-parser');
const app = express();
const configRoutes = require('./routes');


const haha = function(req: Request,res: Response,next: NextFunction)
{
  console.log("*************************************************************************************************")
  console.log("request bodies " + JSON.stringify(req.body) + " URL path requested for : " +
  req.originalUrl + " HTTP verb: " + req.method + "\n");   //https://stackoverflow.com/questions/26634451/how-do-i-find-original-request-path-before-redirect-express-4/26635128#26635128
  console.log("*************************************************************************************************")
  next();
}

app.use(haha);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser());




let uCount:any = {};

const haha2 = function (req: Request,res: Response,next:NextFunction)
{
  if(uCount[req.originalUrl] == null)
  {
    uCount[req.originalUrl] = 1;
  } 
  else
  {
    uCount[req.originalUrl] ++;
  }

console.log("For the URL " + req.originalUrl + " There are " + uCount[req.originalUrl] + " requests");
console.log("*************************************************************************************************")
next();
}


app.use(haha2)


configRoutes(app);

app.listen(3000, () => {
console.log("We've now got a server!");
console.log("Your routes will be running on http://localhost:3000");
});




//referenced lab4 , lab6 and lab7 lectrure codes. 