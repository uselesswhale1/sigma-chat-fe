import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, Avatar, Heading, IconButton } from "@chakra-ui/react";
import { PALLETE } from "../constants/color-pallete";

interface NavigationInviteProps {
  name: string;
  onDelete: () => void;
  onConfirm: () => void;
}

export const NavigationInvite = ({
  name,
  onConfirm,
  onDelete,
}: NavigationInviteProps) => (
  <Flex bg={PALLETE.a} p={4} m={1} direction="row" gap="4" alignItems="center">
    <Avatar name={name} />
    <Heading
      size="sm"
      w={200}
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      children={name}
    />
    <IconButton
      aria-label="Confirm invitation"
      icon={<CheckIcon />}
      onClick={onConfirm}
      variant="outline"
      bg="lightgreen"
    />
    <IconButton
      aria-label="Decline invitation"
      icon={<CloseIcon />}
      onClick={onDelete}
      variant="ghost"
      bg="tomato"
    />
  </Flex>
);
