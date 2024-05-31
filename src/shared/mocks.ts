import { Chat, User } from "./models"

export const anonymUser: User = {
  id: 999,
  name: 'Unknown',
  photoUrl: 'https://thumbs.dreamstime.com/b/d-white-man-red-questionmark-computer-generated-image-isolated-68105896.jpg',
  bio: '',
  chats: []
};

export const usersMock: User[] = [
  {
    id: 301,
    name: 'John Doe',
    photoUrl: 'https://bit.ly/dan-abramov',
    bio: 'I\'d prefer to stay anonymous',
    chats: [101, 102, 103],
  },
  {
    id: 302,
    name: 'Steven King',
    photoUrl: '',
    bio: 'I like writing books YES',
    chats: [101]
  },
  {
    id: 303,
    name: 'Patrick Bateman',
    photoUrl: 'https://bit.ly/ryan-florence',
    bio: 'New card, WDYT? The color is bone',
    chats: [102, 103]
  },
]

export const chatsMock: Chat[] = [
  {
    id: 101,
    name: usersMock[0].name,
    photoUrl: usersMock[0].photoUrl,
    participants: [usersMock[0].id],
    // currentEvent: 'Typing...',
    messages: [
      {
        id: 111,
        authorId: 301,
        content: `
        My tea\'s gone cold, I\'m wondering why I
        Got out of bed at all
        The morning rain clouds up my window
        And I can't see at all`,
        createdAt: '2024-05-31T04:25:00.000Z',
        modifiedAt: '2024-05-31T11:08:00.000Z',
      },
      {
        id: 112,
        authorId: 302,
        content: `
        Dear Slim, I wrote you, but you still ain't callin'
        I left my cell, my pager and my home phone at the bottom
        I sent two letters back in autumn, you must not've got 'em
        There probably was a problem at the post office or somethin'
        Sometimes I scribble addresses too sloppy when I jot 'em`,
        createdAt: '2024-05-31T04:25:00.000Z',
        modifiedAt: '2024-05-31T11:08:00.000Z',
      },
      {
        id: 113,
        authorId: 302,
        content: `
          But anyways, fuck it, what's been up, man? How's your daughter?
          My girlfriend's pregnant too, I'm 'bout to be a father
          If I have a daughter, guess what I'ma call her? I'ma name her Bonnie
          I read about your Uncle Ronnie too, I'm sorry
          I had a friend kill himself over some bitch who didn't want him
          I know you probably hear this every day, but I'm your biggest fan
          I even got the underground shit that you did with Skam
          `,
        createdAt: '2024-05-31T04:25:00.000Z',
      },
    ],
    createdAt: '2024-05-30T04:25:00.000Z'
    // deletedAt: 'asdas',
  },
  {
    id: 102,
    name: usersMock[1].name,
    photoUrl: usersMock[1].photoUrl,
    participants: [usersMock[1].id],
    messages: [
      {
        id: 211,
        authorId: 301,
        content: `
        My tea\'s gone cold, I\'m wondering why I
        Got out of bed at all
        The morning rain clouds up my window
        And I can't see at all`,
        createdAt: '2024-05-31T04:25:00.000Z',
        modifiedAt: '2024-05-31T11:08:00.000Z',
      },
      {
        id: 212,
        authorId: 301,
        content: `
        Dear Slim, I wrote you, but you still ain't callin'
        I left my cell, my pager and my home phone at the bottom
        I sent two letters back in autumn, you must not've got 'em
        There probably was a problem at the post office or somethin'
        Sometimes I scribble addresses too sloppy when I jot 'em`,
        createdAt: '2024-05-31T04:25:00.000Z',
        modifiedAt: '2024-05-31T11:08:00.000Z',
      },
      {
        id: 213,
        authorId: 303,
        content: `
          But anyways, fuck it, what's been up, man? How's your daughter?
          My girlfriend's pregnant too, I'm 'bout to be a father
          If I have a daughter, guess what I'ma call her? I'ma name her Bonnie
          I read about your Uncle Ronnie too, I'm sorry
          I had a friend kill himself over some bitch who didn't want him
          I know you probably hear this every day, but I'm your biggest fan
          I even got the underground shit that you did with Skam
          `,
        createdAt: '2024-05-31T04:25:00.000Z',
      },
    ],
    createdAt: '2024-05-30T04:25:00.000Z'
    // deletedAt: 'asdas',
  },
  {
    id: 103,
    name: usersMock[1].name,
    photoUrl: usersMock[1].photoUrl,
    participants: [usersMock[1].id],
    messages: [
      {
        id: 211,
        authorId: 301,
        content: `
        My tea\'s gone cold, I\'m wondering why I
        Got out of bed at all
        The morning rain clouds up my window
        And I can't see at all`,
        createdAt: '2024-05-31T04:25:00.000Z',
        modifiedAt: '2024-05-31T11:08:00.000Z',
      },
      {
        id: 212,
        authorId: 303,
        content: `
        Dear Slim, I wrote you, but you still ain't callin'
        I left my cell, my pager and my home phone at the bottom
        I sent two letters back in autumn, you must not've got 'em
        There probably was a problem at the post office or somethin'
        Sometimes I scribble addresses too sloppy when I jot 'em`,
        createdAt: '2024-05-31T04:25:00.000Z',
        modifiedAt: '2024-05-31T11:08:00.000Z',
      },
      {
        id: 213,
        authorId: 303,
        content: `
          But anyways, fuck it, what's been up, man? How's your daughter?
          My girlfriend's pregnant too, I'm 'bout to be a father
          If I have a daughter, guess what I'ma call her? I'ma name her Bonnie
          I read about your Uncle Ronnie too, I'm sorry
          I had a friend kill himself over some bitch who didn't want him
          I know you probably hear this every day, but I'm your biggest fan
          I even got the underground shit that you did with Skam
          `,
        createdAt: '2024-05-31T04:25:00.000Z',
      },
    ],
    createdAt: '2024-05-30T04:25:00.000Z'
    // deletedAt: 'asdas',
  },
]


// // first, build an easier lookup of author data:
// export const users_chats: { [K in number]: UserWithChats } = {};

// usersMock.forEach((user) => { users_chats[user.id] = { ...user, chats: [] }; });

// // now do the "join":
// chatsMock.forEach((chat) => {
//   chat.participants = users_chats[chat.author_id];
// });