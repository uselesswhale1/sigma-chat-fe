import { useState } from "react";
import { HamburgerIcon, EditIcon } from "@chakra-ui/icons";
import {
  Flex,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { PALLETE } from "../constants/color-pallete";
import { Chat } from "../models";

interface NavigationCardProps extends Chat {
  onSelect: (id: Chat["id"]) => void;
  onDelete: (id: Chat["id"]) => void;
  isSelected: boolean;
  // typingMsg: string
}

export const NavigationCard = ({
  id,
  name,
  // typingMsg,
  lastMessage: message,
  isSelected,
  onSelect,
  onDelete,
}: NavigationCardProps) => {
  const [activeMenu, setActiveMenu] = useState<string>("");

  const closeMenu = (): void => setActiveMenu("");

  const blockProps = {
    w: 200,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Flex
      bg={isSelected ? PALLETE.b : PALLETE.a}
      p={4}
      m={1}
      onClick={() => onSelect(id)}
    >
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Avatar name={name} />
        <Box>
          <Heading size="sm" {...blockProps} children={name} />

          <Heading size="xs" {...blockProps} children={message} />

          <Box {...blockProps}>{/* {typingMsg} */}</Box>
        </Box>
      </Flex>
      <Menu isOpen={activeMenu === id}>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(id);
          }}
          variant="ghost"
        />
        <MenuList onMouseLeave={closeMenu}>
          {[
            {
              children: "Edit",
              isDisabled: true,
              onClick: () => {},
              icon: <EditIcon />,
            },
            {
              children: "Delete",
              onClick: () => {
                onDelete(id);
              },
              icon: <EditIcon />,
            },
          ].map((item) => (
            <MenuItem {...item} key={item.children} />
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};
