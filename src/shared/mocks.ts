import { User, Message } from "./models";

export const usersMock: User[] = [
  {
    bio: 'I like books and swimming',
    id: 12312,
    name: 'Steven King',
    online: true,
    photoUrl: 'https://bit.ly/ryan-florence'
  },
  {
    bio: 'I\'d prefer to stay anonymous',
    id: 42141,
    name: 'John Doe',
    online: false,
    photoUrl: 'https://bit.ly/kent-c-dodds'
  },
  {
    bio: 'New card. WDYT?',
    id: 12312,
    name: 'Patrick Bateman',
    online: true,
    photoUrl: ''
  }
]

export const chatMock: Message[] = [
  {
    id: 1,
    author: usersMock[0],
    content: 'Hey! How are you? Happy birthday by the way. I\'d like to visit your BD party soon.! Be right back =)',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[1],
    content: 'hi! Long time no see))) Thank you a lot. I plan on having some party on the weekends, let me know if you are available, will book place for you to stay',
    createdAt: '2024-03-24T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[1],
    content: 'Sounds great, what about Tiffany? Did you invite her? I hope to see her thereo',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[0],
    content: 'Sure bro',
    createdAt: '2024-03-24T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[0],
    content: 'great, see you soon',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[1],
    content: 'haha gotcha',
    createdAt: '2024-03-24T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[0],
    content: 'Hey! How are you? Happy birthday by the way. I\'d like to visit your BD party soon.! Be right back =)',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[1],
    content: 'hi! Long time no see))) Thank you a lot. I plan on having some party on the weekends, let me know if you are available, will book place for you to stay',
    createdAt: '2024-03-24T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[1],
    content: 'Sounds great, what about Tiffany? Did you invite her? I hope to see her thereo',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[0],
    content: 'Sure bro',
    createdAt: '2024-03-24T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[0],
    content: 'great, see you soon',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[1],
    content: 'haha gotcha',
    createdAt: '2024-03-24T00:00:00.000Z'
  },
]


export const msgMock: Message[] = [
  {
    id: 1,
    author: usersMock[0],
    content: 'I don\'t think so',
    createdAt: '2024-01-04T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[1],
    content: 'Sure bro',
    createdAt: '2024-03-24T00:00:00.000Z'
  },
  {
    id: 1,
    author: usersMock[2],
    content: 'would you like to eat ice cream or go for a walk tomorrow?',
    createdAt: '2024-06-14T00:00:00.000Z'
  },

];