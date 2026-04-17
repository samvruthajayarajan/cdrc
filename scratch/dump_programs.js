
const { MongoClient } = require('mongodb');

async function checkPrograms() {
  const uri = "mongodb://projecterp109_db_user:crdcproject@ac-dkj9xyb-shard-00-00.kez5w2q.mongodb.net:27017,ac-dkj9xyb-shard-00-01.kez5w2q.mongodb.net:27017,ac-dkj9xyb-shard-00-02.kez5w2q.mongodb.net:27017/cdrc?ssl=true&replicaSet=atlas-oazqfl-shard-0&authSource=admin&retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('cdrc');
    const programs = await db.collection('programs').find({}).toArray();
    console.log(JSON.stringify(programs, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

checkPrograms();
