import Agenda from '../../jobs/config';

const ScriptMethods = async ({ method }) => {
  switch (method) {
  case 'StartDashboardJob': {
    Agenda.create('create-dashboard-stats', { type: 'DashboardJob' })
      .unique({ 'data.type': 'DashboardJob' })
      .repeatEvery('15 minutes')
      .schedule('in 5 seconds')
      .save();

    console.log('\n', 'Dashboard Job Has Been Started');

    break;
  }
  }
};

export default ScriptMethods;
