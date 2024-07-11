import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Message } from "../shared/models";
import { chatAtom } from "../shared/store";
import { ChatInput, Card } from "../shared/ui";
import { ChatMessages } from "../widgets/chat-messages";
import { PALLETE } from "../shared/constants";

interface MainProps {
  onMessage: (msg: string) => void;
  messages: Message[];
}

export const Main = ({ onMessage, messages }: MainProps): JSX.Element => {
  const [chat] = useAtom(chatAtom);

  if (!chat) {
    return (
      <Box w={140} margin="250px 50%">
        <p>Select some chat.</p>
      </Box>
    );
  }

  return (
    <Box>
      <Box bgColor={PALLETE.h}>
        <Card
          name={chat.photoUrl || ""}
          photoUrl={chat.photoUrl || ""}
          text={chat.lastMessage}
          header={chat.name}
          bg={PALLETE.h}
        />
      </Box>

      <ChatMessages messages={messages} />

      <ChatInput onEnter={onMessage} />
    </Box>
  );
};
