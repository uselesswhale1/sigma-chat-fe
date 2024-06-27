import { useEffect } from "react";
import { socket } from "../../api";
import {
  User,
  Chat,
  ChatInvite,
  CreateMessageDto,
  CreateChatDto,
} from "../models";
import { EVENTS } from "../types";
import { Message } from "../models";

interface SocketConnectionHookProps {
  user: User | null;
  onMessages: (data: Message[]) => void;
  onMessage: (msg: Message) => void;
  onChats: (data: Chat[]) => void;
  onChat: (data: Chat) => void;
  onChatInvite: (invite: ChatInvite[]) => void;
  // onChatTyping: (data: string) => void;
}

export const useSocketConnection = ({
  user,
  onMessages,
  onMessage,
  onChats,
  onChat,
  onChatInvite,
}: // onChatTyping,
SocketConnectionHookProps) => {
  useEffect(() => {
    if (!(user && user.id)) {
      return;
    }

    socket.connect();

    socket.on("connect", () => {
      console.log("connected");

      socket.emit(EVENTS.CHATS, user.id);
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
      socket.emit("disconnectSocket");
    });

    socket.on(EVENTS.CHAT, onChat);
    socket.on(EVENTS.CHATS, onChats);

    socket.on(EVENTS.MESSAGES, onMessages);
    socket.on(EVENTS.MESSAGE, onMessage);

    socket.on(EVENTS.INVITES, onChatInvite);

    // socket.on(EVENTS.TYPING, onChatTyping);

    return () => {
      // socket.off('connect');
      // socket.off('disconnect');

      // socket.off(EVENTS.MESSAGES);
      // socket.off(EVENTS.CHATS);
      console.log("disconn", user.id);

      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    getChatMessages: (chatId: Chat["id"]) => {
      // specific chat connection
      socket.emit(EVENTS.MESSAGES, chatId);
    },
    createMessage: (newMessage: CreateMessageDto) => {
      socket.emit(EVENTS.MESSAGE_ADD, JSON.stringify(newMessage));
    },
    createChat: (newChat: CreateChatDto) => {
      console.log("called create-chat", newChat);

      socket.emit(EVENTS.ADD_CHAT, JSON.stringify(newChat));
    },
    deleteChat: (req: { userId: string; id: string }) => {
      console.log("called delete-chat", req.id);

      socket.emit(EVENTS.DEL_CHAT, JSON.stringify(req));
    },
    join: (req: { userId: string; id: string }) => {
      console.log("called join-chat", req);

      socket.emit(EVENTS.JOIN_CHAT, JSON.stringify(req));
    },
  };
};
