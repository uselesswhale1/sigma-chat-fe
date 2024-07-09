import { Chat, CreateChatDto, CreateMessageDto, User } from "../shared/models";
import { EVENTS } from "../shared/types";
import { socket } from "./socket";

class ChatService {
  getChatMessages(chatId: Chat["id"]) {
    socket.emit(EVENTS.MESSAGES, chatId);
  }
  createMessage(newMessage: CreateMessageDto) {
    socket.emit(EVENTS.MESSAGE_ADD, JSON.stringify(newMessage));
  }
  createChat(newChat: CreateChatDto) {
    socket.emit(EVENTS.ADD_CHAT, JSON.stringify(newChat));
  }
  deleteChat(req: { userId: string; id: string }) {
    socket.emit(EVENTS.DEL_CHAT, JSON.stringify(req));
  }
  join(id: string) {
    socket.emit(EVENTS.JOIN_CHAT, id);
  }
}

export const chatService = new ChatService();
