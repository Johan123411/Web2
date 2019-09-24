import { Db, Collection } from "mongodb";

const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection: string) => 
{
  let _col: Collection;

  return async () => 
  {
    if (!_col) 
    {
      const db: Db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = 
{
  SB: getCollectionFn("Barua-Siddhant-CS554-Lab1")
};
