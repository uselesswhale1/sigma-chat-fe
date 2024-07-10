import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { PALLETE } from "../constants/color-pallete";

interface ChatInputProps {
  initial?: string;
  onEnter: (input: string) => void;
}

export const ChatInput = ({
  initial = "",
  onEnter,
}: ChatInputProps): JSX.Element => {
  const [message, setMessage] = useState<string>(initial);

  const onApply = () => {
    onEnter(message);
    setMessage("");
  };

  return (
    <Box
      data-testid="chat-test-wrapper"
      p={2}
      bg={PALLETE.bg}
      color={PALLETE.text}
      bottom={0}
      left={0}
      right={0}
      onKeyDown={(e): void => {
        if (e.key === "Enter") {
          e.preventDefault();
          onApply();
        }
      }}
    >
      <InputGroup size="md">
        <Input
          data-testid="chat-test-input"
          pr="4.5rem"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            data-testid="chat-enter-button"
            h="1.75rem"
            size="sm"
            onClick={onApply}
            bg={PALLETE.text}
            children="Send"
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
