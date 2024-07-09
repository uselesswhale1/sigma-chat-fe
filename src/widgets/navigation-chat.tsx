import { EditIcon } from "@chakra-ui/icons";
import { Chat } from "../shared/models";
import { NavigationCard, NavigationCardProps } from "../shared/ui";

type NavigationChatProps = Omit<NavigationCardProps, "actions"> & {
  onDelete: (id: Chat["id"]) => void;
};

export const NavigationChat = ({ onDelete, ...props }: NavigationChatProps) => {
  const actions = [
    {
      children: "Edit",
      isDisabled: true,
      onClick: () => {},
      icon: <EditIcon />,
    },
    {
      children: "Delete",
      onClick: () => {
        onDelete(props.id);
      },
      icon: <EditIcon />,
    },
  ];

  return <NavigationCard {...props} actions={actions} />;
};
