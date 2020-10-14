import mongoose from 'mongoose';
export * as models from './models';

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

export const db = mongoose.connection;
db.on('error', () => console.log('some DB error'));
db.once('open', () => {
  console.log('DB connected');
});
