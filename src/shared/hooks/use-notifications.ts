import { useToast } from "@chakra-ui/react";

export const useNotifications = () => {
  const toast = useToast();

  return {
    success: (message: string, title: string) => {
      toast({
        title,
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    error: (message: string, title?: string) => {
      toast({
        title,
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  };
};
