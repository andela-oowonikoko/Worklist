import faker from 'faker';

const helper = {
  newCredentials: {
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  loginCredentials: {
    email: 'test@email.com',
    password: 'mypassword'
  },
  loginNoEmail: {
    password: 'mypassword'
  },
  loginNoPassword: {
    email: 'test@email.com',
  },
  wrongPassword: {
    email: 'test@email.com',
    password: 'wrongPassword'
  },
  wrongEmail: {
    email: 'wrong@email.com',
    password: 'mypassword'
  },
  noEmailCredential: {
    password: faker.internet.password()
  },
  noPasswordCredential: {
    email: faker.internet.email(),
  },
  createList: {
    title: 'demo',
    task: 'task1',
    priority: 'normal',
    email: 'test@email.com',
    date: faker.date.between('2017-05-23', '2017-07-30'),
    userId: ''
  },
  invalidPriorityList: {
    title: 'demo',
    task: 'task1',
    priority: 'invalid',
    email: 'test@email.com',
    date: faker.date.between('2017-05-23', '2017-07-30'),
    userId: ''
  },
  updateData: {
    title: 'demo',
    userId: '',
    taskKey: ''
  },
  deleteData: {
    title: 'demo',
    userId: '',
  }
};

export default helper;
