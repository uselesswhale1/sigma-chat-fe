import { Box, Flex, Avatar, Heading } from "@chakra-ui/react";
import { PALLETE } from "../constants/color-pallete";

interface CardProps {
  bg?: string;
  name: string;
  photoUrl?: string;
  header?: string;
  text: string;
  m?: number;
  p?: number;
  onClick?: () => void;
  actions?: JSX.Element;
  isReversed?: boolean;
}

export const Card = ({
  bg = PALLETE.d,
  name,
  photoUrl = "",
  header,
  text,
  m = 0,
  p = 2,
  actions,
  isReversed,
  onClick,
}: CardProps): JSX.Element => {
  return (
    <Flex
      p={p}
      m={m}
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
          color={PALLETE.b}
          children={text}
        />
      </Box>

      <Box>{actions}</Box>
    </Flex>
  );
};
