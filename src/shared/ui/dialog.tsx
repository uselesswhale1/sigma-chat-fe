import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";

interface DialogProps {
  open: boolean;
  header: string;
  footerActions: JSX.Element;
  formBody: JSX.Element;
  onClose: () => void;
  onSubmit: () => void;
}

export const Dialog = ({
  header,
  footerActions,
  formBody,
  open,
  onSubmit,
  onClose = () => {},
}: DialogProps): JSX.Element => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={open}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <form onSubmit={onSubmit}>
              <AlertDialogHeader>{header}</AlertDialogHeader>
              <AlertDialogBody>{formBody}</AlertDialogBody>
              <AlertDialogFooter>{footerActions}</AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
