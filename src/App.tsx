import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Navigation, Header, Main } from "./widgets";
import { Chat, ChatInvite, CreateChatForm, Message } from "./shared/models";
import { EVENTS } from "./shared/types";
import { userAtom } from "./shared/store";
import { PALLETE } from "./shared/constants";
import { useSocketConnection } from "./shared/hooks/use-ws-connection";

const App = (): JSX.Element => {
  const [user, setUser] = useAtom(userAtom);

  const [activeChatId, setActiveChatId] = useState<Chat["id"] | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [invites, setInvites] = useState<ChatInvite[]>([]);

  // const typingMsg = useRef<string>("");

  const navigate = useNavigate();

  const { getChatMessages, createMessage, createChat, deleteChat, join } =
    useSocketConnection({
      onMessages: (data: Message[]) => {
        console.log("on-messages", data);
        setMessages(data);
      },
      onMessage: (msg: Message) => {
        if (activeChatId !== msg.chatId) return;

        console.log("on-message", msg);
        setMessages((messages) => [...messages, msg]);
      },
      onChats: (data: Chat[]) => {
        console.log("user-receive", EVENTS.CHATS, data);
        setChats(data);
      },
      onChat: (data: Chat) => {
        console.log("user-receive", EVENTS.CHAT, data);
        setChats((prev) => {
          const newChats = prev.map((c) => {
            if (c.id === data.id) {
              return data;
            }
            return c;
          });

          return newChats;
        });
      },
      onChatInvite: (data: ChatInvite[]) => {
        // const inviteArr = JSON.parse(inviteStr);
        console.log("handle invite-chat", data);
        setInvites(data);
        // TODO open popup and confirm invitation
        // emit socket confirmation/deny
      },
      // onChatTyping: (data: string) => {
      //   const { name, isTyping } = JSON.parse(data);

      //   console.log("handle typing", name, isTyping);

      //   typingMsg.current = isTyping ? `${name} is typing...` : "";
      // },
      user,
    });

  const handleUserReset = (): void => {
    setUser(null);
    navigate("/signup");
  };

  const handleChatChange = (id: Chat["id"]): void => {
    setMessages([]);
    setActiveChatId(id);

    getChatMessages(id);
  };

  const handleChatCreate = (values: CreateChatForm): void => {
    if (user && user.id) {
      createChat({
        ...values,
        creator: { id: user?.id, name: user.name },
        lastMessage: "",
      });
    }
  };
  const handleChatDelete = (id: Chat["id"]): void => {
    if (user && user.id) {
      deleteChat({
        id,
        userId: user?.id,
      });
    }
  };

  const handleInviteConfirm = (id: Chat["id"]): void => {
    if (user && user.id) {
      join({
        id,
        userId: user?.id,
      });
    }
  };
  const handleInviteDecline = (id: Chat["id"]): void => {
    if (user && user.id) {
      console.log("todo delete invitation", id);
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user") ?? "{}");

    if (!(currentUser && currentUser.id)) {
      navigate("/signup");
      return;
    }

    if (currentUser.id) {
      setUser(currentUser);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = (msg: string) => {
    if (activeChatId && user && user?.id) {
      const message = {
        chatId: activeChatId,
        content: msg,
        creator: user.id,
      };
      createMessage(message);
    }
  };

  if (!(user && user.id)) {
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
            // typingMsg={typingMsg.current}
            onChatChange={handleChatChange}
            onChatCreate={handleChatCreate}
            onChatDelete={handleChatDelete}
            onInviteConfirm={handleInviteConfirm}
            onInviteDecline={handleInviteDecline}
          />
        </GridItem>
        <GridItem pl="2" bg={PALLETE.bg} area={"main"}>
          <Main
            // user={user}
            onMessage={sendMessage}
            messages={messages}
            // typingMsg={typingMsg.current}
            // activeUserId={user.id} chatId={activeChatId}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default App;
