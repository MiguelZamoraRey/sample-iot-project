const mongoose = require('mongoose');

let cachedMongoConn = null;

const mongoUri =
  process.env.MONGO_URL === 'local' ? 'secret_key' : process.env.MONGO_URL;

const closeConnection = async () => {
  console.log('cachedDB before close', cachedMongoConn);
  console.log('Close Mongo Connection');
  await mongoose.connection.close();
  console.log('cachedDB after close', cachedMongoConn);
};

const initSession = async () => {
  // console.log('cachedDB before initSession', cachedMongoConn)
  console.log('initSession Mongo Connection');
  return await mongoose.connection.startSession();
  // console.log('cachedDB after initSession', cachedMongoConn)
};

const connectMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', (error) => {
        console.log('Error: Connection to Mongo failed');
        reject(error);
      })
      .on('close', (close) => {
        console.log('Connection to DB closed');
        //process.exit(1);
      })
      .once('open', () => {
        // Log connections
        const infos = mongoose.connections;
        infos.map((info) =>
          console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
        );

        // Return successful promise
        resolve(cachedMongoConn);
      });

    if (!cachedMongoConn) {
      // Because `cachedMongoConn` is in the global scope, Lambda may retain it between
      // function calls thanks to `callbackWaitsForEmptyEventLoop`.
      // This means our Lambda function doesn't have to go through the
      // potentially expensive process of connecting to MongoDB every time.
      cachedMongoConn = mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        connectTimeoutMS: 10000,
        maxPoolSize: 1,
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // and MongoDB driver buffering
      });
    } else {
      console.log('MongoDB: using cached database instance');
      resolve(cachedMongoConn);
    }
  });
};

module.exports = {
  connectMongo,
  closeConnection,
  initSession,
};
