import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Navigation, Header, Main } from "./widgets";
import { PALLETE } from "./shared/constants";
import { chatAtom, userAtom } from "./shared/store";
import { Chat, ChatInvite, Message } from "./shared/models";
import { useNotifications, useSocketConnection } from "./shared/hooks";
import { authService, chatService } from "./api";

const App = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);

  const [, setChat] = useAtom(chatAtom);

  const [activeChatId, setActiveChatId] = useState<Chat["id"] | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [invites, setInvites] = useState<ChatInvite[]>([]);

  const loading = useRef<boolean>(false);

  const navigate = useNavigate();
  const notify = useNotifications();

  const isUserExists = !!(user && user.id);

  const onEventMessage = (msg: Message) => {
    if (activeChatId !== msg.chatId) {
      return;
    }

    setMessages((messages) => [...messages, msg]);
  };

  const onEventChat = (data: Chat) => {
    const isNewChat = chats.findIndex(({ id }) => id === data.id) === -1;

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

  useSocketConnection({
    user: user,
    chats: chats,
    activeChatId: activeChatId,
    onMessages: setMessages,
    onMessage: onEventMessage,
    onChats: setChats,
    onInvites: setInvites,
    onChat: onEventChat,
  });

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

  const handleUserReset = (): void => {
    setUser(null);

    navigate("/signin");
  };

  const handleChatChange = (changedId: Chat["id"]): void => {
    setMessages([]);
    setActiveChatId(changedId);
    chatService.getChatMessages(changedId);
  };

  const sendMessage = (msg: string) => {
    if (activeChatId && isUserExists) {
      const message = {
        chatId: activeChatId,
        content: msg,
        creator: user.id,
      };
      chatService.createMessage(message);
    }
  };

  if (!isUserExists) {
    return <></>;
  }

  return (
    <Box className="App" bg={PALLETE.j} h={"100vh"}>
      <Grid
        templateAreas={`
          "header header"
          "nav main"
          `}
        gridTemplateRows={"56px 1fr "}
        gridTemplateColumns={"360px 1fr"}
        gap="2"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg={PALLETE.h} area={"header"}>
          <Header onUserReset={handleUserReset} />
        </GridItem>
        <GridItem bg={PALLETE.i} area={"nav"}>
          <Navigation
            chats={chats}
            invites={invites}
            onChatChange={handleChatChange}
          />
        </GridItem>
        <GridItem pl="2" bg={PALLETE.j} area={"main"}>
          <Main onMessage={sendMessage} messages={messages} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default App;
