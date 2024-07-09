import { useEffect } from "react";
import { socket } from "../../api";
import { User, Chat, ChatInvite } from "../models";
import { EVENTS } from "../types";
import { Message } from "../models";

interface SocketConnectionHookProps {
  user: User | null;
  chats: Chat[];
  activeChatId: string | null;
  onMessages: (data: Message[]) => void;
  onChats: (data: Chat[]) => void;
  onInvites: (data: ChatInvite[]) => void;

  onMessage: (msg: Message) => void;
  onChat: (data: Chat) => void;
}

export const useSocketConnection = ({
  user,
  chats,
  activeChatId,
  onMessages,
  onMessage,
  onChats,
  onInvites,
  onChat,
}: SocketConnectionHookProps) => {
  const isUserExists = user && user.id;
  useEffect(() => {
    if (!isUserExists) {
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

    socket.on(EVENTS.CHATS, onChats);

    socket.on(EVENTS.MESSAGES, onMessages);

    socket.on(EVENTS.INVITES, onInvites);

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isUserExists) {
      return;
    }

    socket.on(EVENTS.CHAT, onChat);

    return () => {
      socket.off(EVENTS.CHAT);
    };
  }, [user, chats]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isUserExists || !activeChatId) {
      return;
    }

    socket.on(EVENTS.MESSAGE, onMessage);

    return () => {
      socket.off(EVENTS.MESSAGE);
    };
  }, [user, activeChatId]); // eslint-disable-line react-hooks/exhaustive-deps
};
