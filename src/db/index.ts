import mongoose, {Document} from 'mongoose';
import { config } from 'node-config-ts';

export * as models from './models';

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

export const db = mongoose.connection;
db.on('error', (error) => console.error('DB error: ', error));
db.once('open', () => {
  console.log('DB connected');
});
