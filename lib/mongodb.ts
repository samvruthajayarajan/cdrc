import { MongoClient, Db } from 'mongodb';
import dns from 'dns';

// Force IPv4 for DNS resolution — fixes SRV lookup issues on some Windows setups
dns.setDefaultResultOrder('ipv4first');

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'cdrc';

if (!uri) throw new Error('MONGODB_URI environment variable is not set');

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const c = await clientPromise;
  return c.db(dbName);
}

export default clientPromise;
