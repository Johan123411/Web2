import { MongoClient, Db } from "mongodb";

const mongoConfig = 
{
  serverUrl: "mongodb://localhost:27017/",
  database: "Barua-Siddhant-CS554-Lab1"
};

let _connection: MongoClient;
let _db: Db ;

module.exports = async () => 
{
  if (!_connection) 
  {
    _connection = await MongoClient.connect(mongoConfig.serverUrl,{ useNewUrlParser: true });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};
