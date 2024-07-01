import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Navigation, Header, Main } from "./widgets";
import {
  Chat,
  ChatInvite,
  CreateChatForm,
  Message,
  // User,
  CreateMessageDto,
  CreateChatDto,
} from "./shared/models";
// import { EVENTS } from "./shared/types";
import { chatAtom, userAtom } from "./shared/store";
import { PALLETE } from "./shared/constants";
// import { useSocketConnection } from "./shared/hooks/use-ws-connection";

import { socket } from "./api";
// import { ROUTES } from "./shared";
import { authService } from "./api/auth.service";
import { useNotifications } from "./shared/hooks";

import { EVENTS } from "./shared";

const getChatMessages = (chatId: Chat["id"]) => {
  socket.emit(EVENTS.MESSAGES, chatId);
};
const createMessage = (newMessage: CreateMessageDto) => {
  socket.emit(EVENTS.MESSAGE_ADD, JSON.stringify(newMessage));
};
const createChat = (newChat: CreateChatDto) => {
  socket.emit(EVENTS.ADD_CHAT, JSON.stringify(newChat));
};
const deleteChat = (req: { userId: string; id: string }) => {
  socket.emit(EVENTS.DEL_CHAT, JSON.stringify(req));
};
const join = (id: string) => {
  socket.emit(EVENTS.JOIN_CHAT, id);
};

const App = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);
  const [, setChat] = useAtom(chatAtom); // chat

  const [activeChatId, setActiveChatId] = useState<Chat["id"] | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [invites, setInvites] = useState<ChatInvite[]>([]);

  const loading = useRef<boolean>(false);

  const navigate = useNavigate();
  const notify = useNotifications();

  const onEventMessage = (msg: Message) => {
    console.log(2, EVENTS.MESSAGE, activeChatId, msg.chatId);

    if (activeChatId !== msg.chatId) {
      return;
    }

    setMessages((messages) => [...messages, msg]);
  };

  const onEventChat = (data: Chat) => {
    // case1: update existing chat 'lastMessage' field
    // case2: push new after invite accept

    console.log(4, EVENTS.CHAT, data.id);

    const isNewChat = chats.findIndex(({ id }) => id === data.id) === -1;

    console.log(isNewChat, chats, data);

    if (isNewChat) {
      setChats((prev) => {
        setChat(data);

        return [data, ...prev];
      });
      return;
    }

    setChats((prev) => {
      const newChats = prev.map((c) => {
        if (c.id === data.id) {
          return data;
        }
        return c;
      });

      return newChats;
    });
  };

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

    socket.on(EVENTS.CHATS, setChats);
    // socket.on(EVENTS.CHAT, onEventChat);

    socket.on(EVENTS.MESSAGES, setMessages);
    // socket.on(EVENTS.MESSAGE, onEventMessage);

    socket.on(EVENTS.INVITES, setInvites);

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isUserExists) {
      return;
    }

    socket.on(EVENTS.CHAT, onEventChat);

    return () => {
      socket.off(EVENTS.CHAT);
    };
  }, [user, chats]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isUserExists || !activeChatId) {
      return;
    }

    socket.on(EVENTS.MESSAGE, onEventMessage);

    return () => {
      socket.off(EVENTS.MESSAGE);
    };
  }, [user, activeChatId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!activeChatId) {
      return;
    }
    const selected = chats.find(({ id }) => activeChatId === id);
    setChat(selected?.id ? selected : null);
  }, [activeChatId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loading.current) {
      return;
    }
    const token = sessionStorage.getItem("token") || "";

    console.log(token);

    if (!token) {
      navigate("/signin");
      return;
    }

    loading.current = true;
    authService
      .profile(token)
      .then((res: any) => {
        console.log(111, res);
        if (res.data.user.id) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        notify.error("Please, sign in again");
        navigate("/signin");
      })
      .finally(() => {
        loading.current = false;
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isUserExists = !!(user && user.id);

  const handleUserReset = (): void => {
    setUser(null);

    navigate("/signin");
  };

  const handleChatChange = (changedId: Chat["id"]): void => {
    setMessages([]);
    setActiveChatId(changedId);
    getChatMessages(changedId);
  };

  const handleChatCreate = (values: CreateChatForm): void => {
    if (isUserExists) {
      createChat({
        ...values,
        creator: user.id,
        lastMessage: "",
      });
    }
  };
  const handleChatDelete = (deletedId: Chat["id"]): void => {
    if (isUserExists) {
      deleteChat({
        id: deletedId,
        userId: user?.id,
      });
    }
  };

  const handleInviteDecline = (id: Chat["id"]): void => {
    if (isUserExists) {
      console.log("todo delete invitation", id);
    }
  };

  const sendMessage = (msg: string) => {
    if (activeChatId && isUserExists) {
      const message = {
        chatId: activeChatId,
        content: msg,
        creator: user.id,
      };
      createMessage(message);
    }
  };

  if (!isUserExists) {
    return <></>;
  }

  return (
    <Box className="App" bg={PALLETE.a} h={"100vh"}>
      <Grid
        templateAreas={`
          "header header"
          "nav main"
          `}
        gridTemplateRows={"60px 1fr "}
        gridTemplateColumns={"360px 1fr"}
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg={PALLETE.a} area={"header"}>
          <Header onUserReset={handleUserReset} />
        </GridItem>
        <GridItem bg={PALLETE.bg} area={"nav"}>
          <Navigation
            chats={chats}
            invites={invites}
            onChatChange={handleChatChange}
            onChatCreate={handleChatCreate}
            onChatDelete={handleChatDelete}
            onInviteConfirm={join}
            onInviteDecline={handleInviteDecline}
          />
        </GridItem>
        <GridItem pl="2" bg={PALLETE.bg} area={"main"}>
          <Main onMessage={sendMessage} messages={messages} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default App;
