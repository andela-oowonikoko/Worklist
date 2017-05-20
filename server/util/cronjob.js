// Reference the node-schedule npm package.
import { sendMail } from './helper';

const schedule = require('node-schedule');

export default function (rule, msg, email) {
  const APP = {
    scheduleJob() {
      const job = schedule.scheduleJob(rule, () => {
        sendMail(email, msg);
      });
    },

    init() {
      APP.scheduleJob();
    }
  };

  (() => {
    APP.init();
  })();
}

