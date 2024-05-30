// export * from './message.dto';
// export * from './user.dto';

export type Message = {
  id: number
  author: User
  content: string
  createdAt: string
  modifiedAt?: string
}

export type User = {
  id: number;
  name: string;
  photoUrl: string;
  online: boolean
  bio: string;
}