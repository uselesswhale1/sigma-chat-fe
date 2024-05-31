export type User = {
  id: number;
  name: string;
  surname?: string;
  photoUrl: string;
  bio: string;
  chats: number[]
}


export type Chat = {
  id: number;
  name: string;
  photoUrl: string;
  participants: User['id'][];
  messages: Message[];
  createdAt: string;
  currentEvent?: string;
  deletedAt?: string;
}

export type Message = {
  id: number;
  authorId: User['id'];
  content: string;
  createdAt: string;
  modifiedAt?: string;
}