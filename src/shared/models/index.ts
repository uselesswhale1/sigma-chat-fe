type Entity = {
  id: string;
  name: string;
  photoUrl?: string;
};

type ActionDates = {
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type User = Entity &
  ActionDates & {
    firstName: string;
    lastName?: string;
    lastActive?: string;
    email: string;
    bio?: string;
    chats: Chat["id"][];
  };

export type Chat = Entity &
  ActionDates & {
    lastMessage: string;
    creator: Entity;
  };

export type ChatInvite = {
  id: string;
  name: string;
};

export type Message = ActionDates & {
  content: string;
  creator: User;
  chatId: string;
};

export type CreateChatForm = Omit<CreateChatDto, "lastMessage">;
export type CreateChatDto = {
  name: string;
  photoUrl?: string;
  lastMessage?: string;
  creator: string;
  invited: string[];
};

export type CreateMessageDto = {
  content: string;
  creator: User["id"];
  chatId: Chat["id"];
};

export type SignInValues = {
  email: string;
  password: string;
};

export type SignUpValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
