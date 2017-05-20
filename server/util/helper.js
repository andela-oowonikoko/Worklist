const nodemailer = require('nodemailer');

export function dateFrom(endDate) {
  const currentDate = new Date();
  let hours;
  let rule;
  console.log(currentDate.getDate(), endDate.split('-')[2]);
  if (currentDate.getFullYear() < endDate.split('-')[0]) {
    console.log('over a year');
  } else if (currentDate.getMonth() + 1 < endDate.split('-')[1]) {
    console.log('not in the same month because',
      currentDate.getMonth(), ' is greater than ', endDate);
  } else if (currentDate.getDate() < endDate.split('-')[2]) {
    hours = ((endDate.split('-')[2] -
    (currentDate.getDate() - 1)) * 24) +
    (currentDate.getHours() - 22);
    rule = (hours % 24 === 0) ?
      `1 * ${hours / 24} * *` :
      `1 ${hours % 24} ${Math.floor(hours / 24) + currentDate.getDate()} * *`;
  } else if (currentDate.getDate() === parseInt(endDate.split('-')[2], 10)) {
    return `1 ${currentDate.getHours() + 1} ${currentDate.getDate()} * *`;
  }
  return rule;
}

export function sendMail(receiver, task) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASS
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Worklist 👻" <no-reply@worklist.com>', // sender address
    to: receiver, // list of receivers
    subject: 'Your Task is Due', // Subject line
    html: `<p><b>Hello Friend, </b><br />
      Your task <i><u>${task}</u>
      </i> is due. Do not forget to complete it</p>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
