const taskCom = require('./taskCom');

const constructorMethod = (app) => 
{
  app.use("/", taskCom);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;