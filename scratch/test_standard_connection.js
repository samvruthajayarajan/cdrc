
const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = "mongodb://sp151048_db_user:E2jR1LluRmM1VE9b@ac-djcptt8-shard-00-00.8gdtuxs.mongodb.net:27017,ac-djcptt8-shard-00-01.8gdtuxs.mongodb.net:27017,ac-djcptt8-shard-00-02.8gdtuxs.mongodb.net:27017/?ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
  const dbName = 'cdrc';

  console.log('Testing connection to Standard Connection String (direct shard access)');
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000
  });

  try {
    console.log('Connecting...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('Connection ERROR details:');
    console.error('Message:', err.message);
  } finally {
    await client.close();
  }
}

testConnection();
