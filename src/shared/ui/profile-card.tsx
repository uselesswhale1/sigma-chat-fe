import { Box, Flex, Heading, Avatar } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { PALLETE } from "../constants/color-pallete";
import { userAtom } from "../store";

export const ProfileCard = (): JSX.Element => {
  const [user] = useAtom(userAtom);

  if (!(user && user.id)) {
    return <></>;
  }

  return (
    <Flex
      flex="1"
      gap="4"
      alignItems="center"
      flexWrap="wrap"
      bg={PALLETE.text}
      px={3}
      py={1}
      borderRadius={10}
    >
      <Box>
        <Heading size="sm" textAlign="left" children={user.firstName} />
        <Box
          w={100}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          children={user.bio || "user bio placeholder"}
        />
      </Box>
      <Avatar name={user.firstName} />
    </Flex>
  );
};
