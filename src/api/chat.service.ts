import { Socket } from "socket.io-client";
import { Chat, CreateChatDto, CreateMessageDto, User } from "../shared/models";
import { EVENTS } from "../shared/types";
import { socket as Sockett } from "./socket";

class ChatService {
  constructor(private socket: Socket) {}
  getChatMessages(chatId: Chat["id"]) {
    this.socket.emit(EVENTS.MESSAGES, chatId);
  }
  createMessage(newMessage: CreateMessageDto) {
    this.socket.emit(EVENTS.MESSAGE_ADD, JSON.stringify(newMessage));
  }
  createChat(newChat: CreateChatDto) {
    this.socket.emit(EVENTS.ADD_CHAT, JSON.stringify(newChat));
  }
  deleteChat(req: { userId: string; id: string }) {
    this.socket.emit(EVENTS.DEL_CHAT, JSON.stringify(req));
  }
  join(id: string) {
    this.socket.emit(EVENTS.JOIN_CHAT, id);
  }
}

export const chatService = new ChatService(Sockett);
