import {MongoClient} from 'mongodb'
const uri= process.env.EXPO_PUBLIC_MONGODB_URI!
if (!process.env.EXPO_PUBLIC_MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
const options={}
let client: MongoClient
/* eslint-disable prefer-const */
// test
let clientPromise: Promise<MongoClient>;
declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}
if(!global._mongoClientPromise){
    client=new MongoClient(uri, options);
    global._mongoClientPromise=client.connect();
}
clientPromise=global._mongoClientPromise;
export default clientPromise;