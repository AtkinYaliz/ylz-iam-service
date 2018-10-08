import * as mongoose from 'mongoose';


export const open = (mongoUrl: string) => {
   return new Promise((resolve, reject) => {
      // Mongoose options
      const options = {
         autoIndex: false, // Don't build indexes
         bufferMaxEntries: 0,
         keepAlive: 1,
         poolSize: 10, // Maintain up to 10 socket connections
         reconnectInterval: 500, // Reconnect every 500ms
         reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
         useNewUrlParser: true
      };

      // Mock the mongoose for testing purpose using Mockgoose
      // connect to mongo db
      mongoose.connect(mongoUrl, options, (err) => {
         if (err) {
            return reject(err);
         }
         resolve();
      });

      mongoose.connection.on('error', () => {
         throw new Error(`unable to connect to database: ${mongoUrl}`);
      });
   });
};

export const close = () => {
   return mongoose.disconnect();
};
