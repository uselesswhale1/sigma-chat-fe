import { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuItemProps,
} from "@chakra-ui/react";
import { PALLETE } from "../constants/color-pallete";
import { Chat } from "../models";
import { Card } from "./card";

export type NavigationCardProps = Pick<Chat, "id" | "name" | "lastMessage"> & {
  onSelect: (id: Chat["id"]) => void;
  isSelected: boolean;
  actions: MenuItemProps[];
};

export const NavigationCard = ({
  id,
  name,
  lastMessage,
  isSelected,
  onSelect,
  actions = [],
}: NavigationCardProps) => {
  const [activeMenu, setActiveMenu] = useState<string>("");

  const onClose = (): void => {
    setActiveMenu("");
  };

  return (
    <Card
      name={name}
      photoUrl=""
      m={1}
      text={lastMessage}
      bg={isSelected ? PALLETE.c : PALLETE.g}
      header={name}
      onClick={() => onSelect(id)}
      actions={
        <>
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
            <MenuList onMouseLeave={onClose} hidden={!actions.length}>
              {actions.map((item) => (
                <MenuItem {...item} />
              ))}
            </MenuList>
          </Menu>
        </>
      }
    />
  );
};
