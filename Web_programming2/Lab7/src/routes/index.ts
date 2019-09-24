const taskCom = require('./taskCom');
import { Request, Response } from 'express';
// const constructorMethod = (app: { use: { (arg0: string, arg1: any): void; (arg0: string, arg1: (req: Request, res: Response) => void): void; }; }) => 
// {
//   app.use("/", taskCom);

//   app.use("*", (req: Request, res:Response) => {
//     res.sendStatus(404);
//   });
// };



module.exports  = (app: any)=>{

  app.use("/", taskCom);

  app.use("*", (req: Request, res:Response) => {
    res.sendStatus(404);
  });

}

