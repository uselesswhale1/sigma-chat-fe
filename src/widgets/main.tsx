import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { Message } from "../shared/models";
import { chatAtom } from "../shared/store";
import { ChatInput, ChatHeader, ChatMessages } from "../shared/ui";

interface MainProps {
  onMessage: (msg: string) => void;
  messages: Message[];
  // typingMsg: string;
}

export const Main = ({
  onMessage,
  messages,
}: // typingMsg,
MainProps): JSX.Element => {
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
      <ChatHeader chat={chat} /* typingMsg={typingMsg} */ />

      <ChatMessages messages={messages} />

      <ChatInput onEnter={onMessage} />
    </Box>
  );
};
