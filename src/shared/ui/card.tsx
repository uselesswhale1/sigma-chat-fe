import { Box, Flex, Avatar, Heading } from "@chakra-ui/react";
import { PALLETE } from "../constants/color-pallete";

interface CardProps {
  bg?: string;
  name: string;
  photoUrl: string;
  header?: string;
  text: string;
  onClick?: () => void;
  actions?: JSX.Element;
  isReversed?: boolean;
}

export const Card = ({
  bg = PALLETE.bg,
  name,
  photoUrl,
  header,
  text,
  actions,
  isReversed,
  onClick,
}: CardProps): JSX.Element => {
  return (
    <Flex
      p={2}
      m={1}
      bgColor={bg}
      gap="4"
      alignItems="center"
      flexWrap="wrap"
      onClick={onClick}
      flexDirection={isReversed ? "row-reverse" : "row"}
    >
      <Box>
        <Avatar name={name} src={photoUrl} />
      </Box>

      <Box>
        <Heading size="sm" textAlign="left" children={header} />
        <Box
          w={200}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          children={text}
        />
      </Box>

      <Box>{actions}</Box>
    </Flex>
  );
};
