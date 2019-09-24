

const constructorMethod = app => {

app.get("/", (req, res) => {
	res.sendFile('Lovecraft.html', {root: __dirname});
  });

app.get("/public", (req, res) => {
	res.sendFile('Lovecraft.html', {root: __dirname});
  });

app.use("*", (req, res) => {
	res.status(404)        // HTTP status 404: NotFound
   .send('Not found');

 
});
}


module.exports = constructorMethod;
