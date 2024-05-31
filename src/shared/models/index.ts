export type User = {
  id: number;
  name: string;
  surname?: string;
  photoUrl: string;
  bio: string;
}

export type Message = {
  id: number;
  authorId: User['id'];
  content: string;
  createdAt: string;
  modifiedAt: string;
}