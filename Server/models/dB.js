export default {
  users: [
    {
      id: 1,
      firsName: 'Mwafrika',
      lastName: 'Josue',
      email: 'mwafrikajosue@gmail.com',
      password: '123456',
      jobRole: 'IT manager',
      department: 'IT',
      gender: 'male',
      isAdmin: 't',
    },
    {
      id: 2,
      firsName: 'kakule',
      lastName: 'kalenga',
      email: 'kakule@gmail.com',
      password: '1234',
      jobRole: 'coordonator',
      department: 'Management',
      gender: 'male',
      address: 'himbi',
      isAdmin: 'f',
    },
    {
      id: 3,
      firsName: 'lydie',
      lastName: 'mwenyemali',
      email: 'kasereka@gmail.com',
      password: '1234',
      jobRole: 'supervisor',
      department: 'Senior manager',
      gender: 'female',
      address: 'Bukavu',
      isAdmin: 'f',
    },
  ],
  articles: [{
    id: 1,
    title: 'entrepreneurship for all',
    article: 'This is to invite you all to participate to our upcoming event that will take place at Convetion center',
    createdOn: '23/09/2019',
  },
  {
    id: 2,
    title: 'international student',
    article: 'Thank you for having you participate to our great event that is still in progress!!! thank you once again and may God bless you all',
    createdOn: '10/06/2019',
  },
  {
    id: 3,
    title: 'Important notification',
    article: 'we thank you for your participation to the Andela boocamp cycle 10, for that we are very sorry to tell you that we cannot extend your fellowship ...',
    createdOn: '14/09/2019',
  }],
  comments: [
    {
      id: 1,
      comment: 'keep it up my bro',
    },
    {
      id: 2,
      comment: 'receive in the name of Jesus, Take it!!!',
    },
    {
      id: 3,
      comment: 'thank you for your support dear',
    },

  ],
  flag: [
    {
      id: 1,
      articleID: 1,
      createdOn: '11/12/2018',
      reason: 'not true',
      description: 'this article was not published for international students only',
    },
    {
      id: 2,
      articleID: 3,
      createdOn: '11/12/2018',
      reason: 'not true',
      description: 'this article was not published for international students only',
    },
  ],
};
