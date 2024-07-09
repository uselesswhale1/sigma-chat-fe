import { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ChatMessage } from "../shared/ui";
import { userAtom } from "../shared/store";
import { Message } from "../shared/models";

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps): JSX.Element => {
  const [user] = useAtom(userAtom);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <Box overflowY="scroll" h={510} maxH={510} scrollMarginTop="e9e">
      {messages.map((msg) => (
        <ChatMessage
          isOwnMessage={user?.id === msg.creator.id}
          message={msg}
          key={msg.createdAt}
        />
      ))}

      <div ref={messageEndRef} />
    </Box>
  );
};
