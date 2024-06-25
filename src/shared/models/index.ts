type Entity = {
  id: string;
  name: string;
  photoUrl?: string;
};

type Logs = {
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type User = Entity &
  Logs & {
    firstName: string;
    lastName?: string;
    lastActive?: string;
    email: string;
    bio?: string;
    chats: Chat["id"][];
  };

export type Chat = Entity &
  Logs & {
    lastMessage: string;
    creator: Entity;
  };

export type ChatInvite = {
  id: string;
  name: string;
};

export type Message = Logs & {
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
