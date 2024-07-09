import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { NavigationCard } from "../shared/ui";

interface NavigationInviteProps {
  name: string;
  onDelete: () => void;
  onConfirm: () => void;
}

export const NavigationInvite = ({
  name,
  onConfirm,
  onDelete,
}: NavigationInviteProps) => {
  const actions = [
    {
      children: "Confirm",
      onClick: onConfirm,
      icon: <CheckIcon />,
    },
    {
      children: "Decline",
      onClick: onDelete,
      icon: <CloseIcon />,
    },
  ];

  return (
    <NavigationCard
      name={name}
      id={name}
      isSelected={false}
      onSelect={() => {}}
      lastMessage=""
      actions={actions}
    />
  );
};
