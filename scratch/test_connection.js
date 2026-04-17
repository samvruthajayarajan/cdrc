
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Basic .env.local parser
function getEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split('\n');
  const env = {};
  lines.forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.join('=').trim();
    }
  });
  return env;
}

async function testConnection() {
  const env = getEnv();
  const uri = env.MONGODB_URI;
  const dbName = env.MONGODB_DB || 'cdrc';

  console.log('Testing connection to:', uri.replace(/:.+@/, ':****@')); // Hide password
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    family: 4
  });

  try {
    console.log('Connecting...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    if (collections.length === 0) {
      console.log('Database is EMPTY.');
    }
  } catch (err) {
    console.error('Connection ERROR details:');
    console.error('Name:', err.name);
    console.error('Message:', err.message);
    if (err.reason) console.error('Reason:', JSON.stringify(err.reason, null, 2));
    if (err.stack) console.error('Stack trace:', err.stack);
  } finally {
    await client.close();
  }
}

testConnection();
