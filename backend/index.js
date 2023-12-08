import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import './jobs/definitions';
import { PORT } from './config/config';
import router from './routes';
import AgendaJobs from './jobs/config';
import './config';

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static('public'));

app.use('/', express.static(`${__dirname}/uploads`));

app.use('/v1', router);

app.listen(PORT, async () => {
  await AgendaJobs._ready;
  AgendaJobs.start();
  console.log(`app is listening to port ${PORT}`);
});
