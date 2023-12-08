import Agenda from 'agenda';

import { MONGO_URL } from '../../config/config';

const AgendaJobs = new Agenda({
  db: {
    address: MONGO_URL,
    collection: 'agendaJobs'
  },
  defaultConcurrency: 2,
  maxConcurrency: 100,
  defaultLockLifetime: 20 * 60000
});

export default AgendaJobs;
